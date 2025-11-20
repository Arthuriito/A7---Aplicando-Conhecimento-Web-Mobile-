import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class FrontendController {
  
  @Get()
  serveHome(@Res() res: Response) {
    return res.sendFile(join(__dirname, 'descarte', 'public', 'index.html'));
  }

  @Get('cadastro-ponto')
  serveCadastroPonto(@Res() res: Response) {
    return res.sendFile(join(__dirname, 'descarte', 'public', 'cadastro-ponto.html'));
  }

  @Get('registro-descarte')
  serveRegistroDescarte(@Res() res: Response) {
    return res.sendFile(join(__dirname, 'descarte', 'public', 'registro-descarte.html'));
  }

  @Get('consulta-historico')
  serveConsultaHistorico(@Res() res: Response) {
    return res.sendFile(join(__dirname, 'descarte', 'public', 'consulta-historico.html'));
  }

  @Get('relatorios')
  serveRelatorios(@Res() res: Response) {
    return res.sendFile(join(__dirname, 'descarte', 'public', 'relatorios.html'));
  }
}