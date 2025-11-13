# A7 - Aplicando Conhecimento Web Mobile 

API para gestão de descarte de resíduos - Projeto Extensionista alinhado ao ODS 12

## Sobre o Projeto

Esta API foi desenvolvida como parte do componente extensionista da disciplina, seguindo a Resolução nº 7/2018 do MEC e alinhada ao **Objetivo de Desenvolvimento Sustentável 12: "Consumo e Produção Responsáveis"**.

**Disciplina:** Web Mobile  
**Atividade:** A7 - Aplicando Conhecimento  
**Objetivo:** Desenvolver API com NestJS para gestão de descarte de resíduos

## Funcionalidades

- ✅ Cadastro de pontos de descarte
- ✅ Registro de descartes por usuários
- ✅ Consulta de histórico com filtros
- ✅ Dashboard estatístico (/relatorio)
- ✅ Geolocalização de pontos de descarte

## 🛠 Tecnologias

- NestJS
- TypeORM
- SQLite
- TypeScript

## Endpoints Principais

### Pontos de Descarte
- `POST /disposal-points` - Cadastrar novo ponto
- `GET /disposal-points` - Listar todos os pontos
- `GET /disposal-points/:id` - Buscar ponto específico

### Registros de Descarte
- `POST /disposal-records` - Registrar descarte
- `GET /disposal-records` - Listar descartes (com filtros)
- `GET /disposal-records/relatorio` - Dashboard estatístico

## Como Executar

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start

## Como Usar

### Valores para locationType:
- "public" 
- "private"

### Valores para wasteType:
- "plastic", "paper", "organic", "electronic", "glass", "metal"

## Configuração do GitHub

Repositório: https://github.com/Arthuriito/A7---Aplicando-Conhecimento-Web-Mobile-