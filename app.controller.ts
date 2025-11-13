
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      message: '🚀 API de Gestão de Resíduos - Projeto Extensionista ODS 12',
      description: 'Sistema para registro e consulta de descarte de resíduos',
      version: '1.0.0',
      endpoints: {
        'POST /disposal-points': 'Cadastrar ponto de descarte',
        'GET /disposal-points': 'Listar pontos de descarte',
        'GET /disposal-points/:id': 'Buscar ponto específico',
        'POST /disposal-records': 'Registrar descarte',
        'GET /disposal-records': 'Consultar histórico com filtros',
        'GET /disposal-records/relatorio': 'Dashboard estatístico'
      },
      documentation: 'Consulte o README.md para mais informações'
    };
  }
}