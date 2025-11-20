import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getApiInfo() {
    return {
      message: '🚀 API de Gestão de Resíduos - Projeto Extensionista ODS 12',
      endpoints: {
        'POST /disposal-points': 'Cadastrar ponto de descarte',
        'GET /disposal-points': 'Listar pontos',
        'POST /disposal-records': 'Registrar descarte',
        'GET /disposal-records': 'Consultar histórico',
        'GET /disposal-records/relatorio': 'Dashboard estatístico'
      }
    };
  }
}