const API_BASE = 'http://localhost:3000';

// ========== FUNÇÕES UTILITÁRIAS ==========
function mostrarMensagem(mensagem, tipo = 'sucesso') {
    const div = document.getElementById('mensagem');
    if (div) {
        div.textContent = mensagem;
        div.style.color = tipo === 'erro' ? 'red' : 'green';
        div.style.padding = '10px';
        div.style.margin = '10px 0';
        div.style.border = tipo === 'erro' ? '1px solid red' : '1px solid green';
        
        setTimeout(() => {
            div.textContent = '';
            div.style.border = 'none';
        }, 5000);
    }
}

function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

// Tradutores para exibição
const tradutores = {
    wasteType: {
        'plastic': 'Plástico',
        'paper': 'Papel', 
        'organic': 'Orgânico',
        'electronic': 'Eletrônico',
        'glass': 'Vidro',
        'metal': 'Metal'
    }
};

// ========== 1. CADASTRO DE PONTO DE DESCARTE ==========
if (document.getElementById('form-ponto')) {
    const form = document.getElementById('form-ponto');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Coletar categorias selecionadas
        const categorias = [];
        if (document.getElementById('plastic').checked) categorias.push('plastic');
        if (document.getElementById('paper').checked) categorias.push('paper');
        if (document.getElementById('organic').checked) categorias.push('organic');
        if (document.getElementById('electronic').checked) categorias.push('electronic');
        if (document.getElementById('glass').checked) categorias.push('glass');
        if (document.getElementById('metal').checked) categorias.push('metal');
        
        if (categorias.length === 0) {
            mostrarMensagem('Selecione pelo menos uma categoria de resíduo!', 'erro');
            return;
        }
        
        const dados = {
            name: document.getElementById('nome').value,
            neighborhood: document.getElementById('bairro').value,
            locationType: document.getElementById('tipoLocal').value,
            acceptedCategories: categorias,
            latitude: parseFloat(document.getElementById('latitude').value),
            longitude: parseFloat(document.getElementById('longitude').value)
        };
        
        try {
            const response = await fetch(`${API_BASE}/disposal-points`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados)
            });
            
            if (response.ok) {
                mostrarMensagem('✅ Ponto de descarte cadastrado com sucesso!');
                form.reset();
            } else {
                const erro = await response.json();
                mostrarMensagem(`❌ Erro: ${erro.message}`, 'erro');
            }
        } catch (error) {
            mostrarMensagem('❌ Erro ao conectar com a API. Verifique se o servidor está rodando.', 'erro');
        }
    });
}

// ========== 2. REGISTRO DE DESCARTE ==========
if (document.getElementById('form-descarte')) {
    const form = document.getElementById('form-descarte');
    const selectPonto = document.getElementById('disposalPointId');
    
    // Carregar pontos de descarte para o dropdown
    async function carregarPontosDescarte() {
        try {
            const response = await fetch(`${API_BASE}/disposal-points`);
            const pontos = await response.json();
            
            selectPonto.innerHTML = '<option value="">Selecione um ponto...</option>';
            pontos.forEach(ponto => {
                const option = document.createElement('option');
                option.value = ponto.id;
                option.textContent = `${ponto.name} - ${ponto.neighborhood}`;
                selectPonto.appendChild(option);
            });
        } catch (error) {
            selectPonto.innerHTML = '<option value="">Erro ao carregar pontos</option>';
        }
    }
    
    // Configurar data atual como padrão
    document.getElementById('disposalDate').valueAsDate = new Date();
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const dados = {
            userName: document.getElementById('userName').value,
            disposalPointId: parseInt(document.getElementById('disposalPointId').value),
            wasteType: document.getElementById('wasteType').value,
            disposalDate: document.getElementById('disposalDate').value
        };
        
        try {
            const response = await fetch(`${API_BASE}/disposal-records`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados)
            });
            
            if (response.ok) {
                mostrarMensagem('✅ Descarte registrado com sucesso!');
                form.reset();
                document.getElementById('disposalDate').valueAsDate = new Date();
            } else {
                const erro = await response.json();
                mostrarMensagem(`❌ Erro: ${erro.message}`, 'erro');
            }
        } catch (error) {
            mostrarMensagem('❌ Erro ao conectar com a API.', 'erro');
        }
    });
    
    carregarPontosDescarte();
}

// ========== 3. CONSULTA DE HISTÓRICO ==========
if (document.getElementById('form-filtros')) {
    const btnFiltrar = document.getElementById('btn-filtrar');
    const btnLimpar = document.getElementById('btn-limpar');
    const tbody = document.getElementById('tbody-historico');
    const loading = document.getElementById('loading');
    const selectPonto = document.getElementById('filtroPonto');
    
    // Carregar pontos para filtro
    async function carregarPontosParaFiltro() {
        try {
            const response = await fetch(`${API_BASE}/disposal-points`);
            const pontos = await response.json();
            
            selectPonto.innerHTML = '<option value="">Todos</option>';
            pontos.forEach(ponto => {
                const option = document.createElement('option');
                option.value = ponto.id;
                option.textContent = `${ponto.name} - ${ponto.neighborhood}`;
                selectPonto.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar pontos:', error);
        }
    }
    
    // Aplicar filtros
    async function aplicarFiltros() {
        loading.style.display = 'block';
        tbody.innerHTML = '';
        
        const params = new URLSearchParams();
        
        const usuario = document.getElementById('filtroUsuario').value;
        const residuo = document.getElementById('filtroResiduo').value;
        const ponto = document.getElementById('filtroPonto').value;
        const dataInicio = document.getElementById('dataInicio').value;
        const dataFim = document.getElementById('dataFim').value;
        
        if (usuario) params.append('userName', usuario);
        if (residuo) params.append('wasteType', residuo);
        if (ponto) params.append('disposalPointId', ponto);
        if (dataInicio) params.append('startDate', dataInicio);
        if (dataFim) params.append('endDate', dataFim);
        
        try {
            const response = await fetch(`${API_BASE}/disposal-records?${params}`);
            const registros = await response.json();
            
            tbody.innerHTML = registros.map(registro => `
                <tr>
                    <td>${formatarData(registro.disposalDate)}</td>
                    <td>${registro.userName}</td>
                    <td>${tradutores.wasteType[registro.wasteType] || registro.wasteType}</td>
                    <td>${registro.disposalPoint?.name || 'N/A'}</td>
                    <td>${registro.disposalPoint?.neighborhood || 'N/A'}</td>
                </tr>
            `).join('');
            
            if (registros.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Nenhum registro encontrado</td></tr>';
            }
        } catch (error) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: red;">Erro ao carregar dados</td></tr>';
        } finally {
            loading.style.display = 'none';
        }
    }
    
    // Limpar filtros
    function limparFiltros() {
        document.getElementById('form-filtros').reset();
        aplicarFiltros();
    }
    
    btnFiltrar.addEventListener('click', aplicarFiltros);
    btnLimpar.addEventListener('click', limparFiltros);
    
    // Carregar dados iniciais
    carregarPontosParaFiltro();
    aplicarFiltros();
}

// ========== 4. RELATÓRIOS ==========
if (document.getElementById('btn-atualizar')) {
    const btnAtualizar = document.getElementById('btn-atualizar');
    
    async function carregarRelatorios() {
        try {
            const response = await fetch(`${API_BASE}/disposal-records/relatorio`);
            const relatorio = await response.json();
            
            // Atualizar todos os campos do relatório
            document.getElementById('local-ativo').textContent = relatorio.mostActiveLocation || 'Nenhum';
            document.getElementById('residuo-frequente').textContent = 
                tradutores.wasteType[relatorio.mostFrequentWaste] || relatorio.mostFrequentWaste || 'Nenhum';
            document.getElementById('media-diaria').textContent = relatorio.averageDisposalsPerDay.toFixed(1);
            document.getElementById('total-usuarios').textContent = relatorio.totalUsers;
            document.getElementById('total-pontos').textContent = relatorio.totalDisposalPoints;
            
            const variacao = relatorio.growthPercentage;
            document.getElementById('variacao-mensal').textContent = 
                `${variacao > 0 ? '+' : ''}${variacao.toFixed(1)}%`;
            document.getElementById('variacao-mensal').style.color = 
                variacao > 0 ? 'green' : variacao < 0 ? 'red' : 'black';
            
            // Atualizar timestamp
            document.getElementById('ultima-atualizacao').textContent = 
                `Última atualização: ${new Date().toLocaleTimeString('pt-BR')}`;
                
        } catch (error) {
            alert('Erro ao carregar relatórios. Verifique se a API está rodando.');
        }
    }
    
    btnAtualizar.addEventListener('click', carregarRelatorios);
    carregarRelatorios();
}

// ========== 5. PÁGINA INICIAL - ESTATÍSTICAS ==========
if (document.getElementById('total-pontos') && !document.getElementById('btn-atualizar')) {
    async function carregarEstatisticasInicio() {
        try {
            const [pontosResponse, relatorioResponse] = await Promise.all([
                fetch(`${API_BASE}/disposal-points`),
                fetch(`${API_BASE}/disposal-records/relatorio`)
            ]);
            
            const pontos = await pontosResponse.json();
            const relatorio = await relatorioResponse.json();
            
            document.getElementById('total-pontos').textContent = pontos.length;
            document.getElementById('total-usuarios').textContent = relatorio.totalUsers;
            
            // Calcular total de descartes
            const descartesResponse = await fetch(`${API_BASE}/disposal-records`);
            const descartes = await descartesResponse.json();
            document.getElementById('total-descartes').textContent = descartes.length;
            
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
        }
    }
    
    carregarEstatisticasInicio();
}

console.log('✅ Front-end do Sistema de Gestão de Resíduos carregado!');