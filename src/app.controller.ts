import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  
  @Get()
  getHome(@Res() res: Response) {
    return res.sendFile(join(__dirname, '../../public/index.html'));
  }

  @Get('cadastro-ponto')
  getCadastroPonto(@Res() res: Response) {
    return res.sendFile(join(__dirname, '../../public/cadastro-ponto.html'));
  }

  @Get('registro-descarte') 
  getRegistroDescarte(@Res() res: Response) {
    return res.sendFile(join(__dirname, '../../public/registro-descarte.html'));
  }

  @Get('consulta-historico')
  getConsultaHistorico(@Res() res: Response) {
    return res.sendFile(join(__dirname, '../../public/consulta-historico.html'));
  }

  @Get('relatorios')
  getRelatorios(@Res() res: Response) {
    return res.sendFile(join(__dirname, '../../public/relatorios.html'));
  }

  @Get('api')
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