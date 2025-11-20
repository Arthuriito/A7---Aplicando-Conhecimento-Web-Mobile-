import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Servir arquivos estáticos do front-end
  const frontendPath = join(__dirname, 'descarte', 'public');
  app.useStaticAssets(frontendPath);
  
  // Habilitar CORS
  app.enableCors();
  
  await app.listen(3000);
  console.log('🚀 API e Front-end rodando em http://localhost:3000');
  console.log('📄 Front-end disponível em:');
  console.log('   • http://localhost:3000/index.html');
  console.log('   • http://localhost:3000/cadastro-ponto.html');
  console.log('   • http://localhost:3000/registro-descarte.html');
  console.log('   • http://localhost:3000/consulta-historico.html');
  console.log('   • http://localhost:3000/relatorios.html');
}
bootstrap();