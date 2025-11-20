const API_BASE = 'http://localhost:3000';

// Tradutores para exibição
const tradutores = {
    locationType: {
        'public': 'Público',
        'private': 'Privado'
    },
    wasteType: {
        'plastic': 'Plástico',
        'paper': 'Papel',
        'organic': 'Orgânico',
        'electronic': 'Eletrônico',
        'glass': 'Vidro',
        'metal': 'Metal'
    }
};

// Utilidades
function mostrarMensagem(mensagem, tipo = 'sucesso') {
    const div = document.getElementById('mensagem');
    if (div) {
        div.textContent = mensagem;
        div.className = `mensagem ${tipo}`;
        setTimeout(() => div.style.display = 'none', 5000);
    }
}

function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

// 1. Cadastro de Ponto de Descarte
if (document.getElementById('form-ponto')) {
    const form = document.getElementById('form-ponto');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const categorias = Array.from(form.querySelectorAll('input[name="categorias"]:checked'))
            .map(cb => cb.value);
        
        const dados = {
            name: formData.get('nome'),
            neighborhood: formData.get('bairro'),
            locationType: formData.get('tipoLocal'),
            acceptedCategories: categorias,
            latitude: parseFloat(formData.get('latitude')),
            longitude: parseFloat(formData.get('longitude'))
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
                mostrarMensagem('Ponto de descarte cadastrado com sucesso!', 'sucesso');
                form.reset();
            } else {
                const erro = await response.json();
                mostrarMensagem(`Erro: ${erro.message}`, 'erro');
            }
        } catch (error) {
            mostrarMensagem('Erro ao conectar com a API', 'erro');
        }
    });
}

// 2. Registro de Descarte
if (document.getElementById('form-descarte')) {
    const form = document.getElementById('form-descarte');
    const selectPonto = document.getElementById('disposalPointId');
    
    // Carregar pontos de descarte
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
        
        const formData = new FormData(form);
        const dados = {
            userName: formData.get('userName'),
            disposalPointId: parseInt(formData.get('disposalPointId')),
            wasteType: formData.get('wasteType'),
            disposalDate: formData.get('disposalDate')
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
                mostrarMensagem('Descarte registrado com sucesso!', 'sucesso');
                form.reset();
                document.getElementById('disposalDate').valueAsDate = new Date();
            } else {
                const erro = await response.json();
                mostrarMensagem(`Erro: ${erro.message}`, 'erro');
            }
        } catch (error) {
            mostrarMensagem('Erro ao conectar com a API', 'erro');
        }
    });
    
    carregarPontosDescarte();
}

// 3. Consulta de Histórico
if (document.getElementById('form-filtros')) {
    const formFiltros = document.getElementById('form-filtros');
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
        
        const formData = new FormData(formFiltros);
        const params = new URLSearchParams();
        
        for (const [key, value] of formData.entries()) {
            if (value) params.append(key, value);
        }
        
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
        formFiltros.reset();
        aplicarFiltros();
    }
    
    btnFiltrar.addEventListener('click', aplicarFiltros);
    btnLimpar.addEventListener('click', limparFiltros);
    
    // Carregar dados iniciais
    carregarPontosParaFiltro();
    aplicarFiltros();
}

// 4. Relatórios
if (document.getElementById('btn-atualizar')) {
    const btnAtualizar = document.getElementById('btn-atualizar');
    
    async function carregarRelatorios() {
        try {
            const response = await fetch(`${API_BASE}/disposal-records/relatorio`);
            const relatorio = await response.json();
            
            // Atualizar cards
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
                variacao > 0 ? '#4CAF50' : variacao < 0 ? '#f44336' : '#666';
            
            // Atualizar timestamp
            document.getElementById('ultima-atualizacao').textContent = 
                `Última atualização: ${new Date().toLocaleTimeString('pt-BR')}`;
                
        } catch (error) {
            mostrarMensagem('Erro ao carregar relatórios', 'erro');
        }
    }
    
    btnAtualizar.addEventListener('click', carregarRelatorios);
    carregarRelatorios();
}

// 5. Página Inicial - Estatísticas
if (document.getElementById('total-pontos')) {
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

// Configuração do MongoDB (para referência)
const mongoConfig = {
    url: 'mongodb://localhost:27017/waste_management',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
};

console.log('Front-end do Sistema de Gestão de Resíduos carregado!');