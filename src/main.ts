import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Servir arquivos estáticos e permitir acesso direto aos HTML
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    index: false,
    redirect: false
  });
  
  await app.listen(3000);
  console.log('🚀 API rodando em http://localhost:3000');
  console.log('🌐 Front-end disponível em http://localhost:3000');
  console.log('📄 Páginas disponíveis:');
  console.log('   • http://localhost:3000/');
  console.log('   • http://localhost:3000/cadastro-ponto.html');
  console.log('   • http://localhost:3000/registro-descarte.html');
  console.log('   • http://localhost:3000/consulta-historico.html');
  console.log('   • http://localhost:3000/relatorios.html');
}
bootstrap();