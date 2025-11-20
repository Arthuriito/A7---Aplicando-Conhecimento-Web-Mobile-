"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const frontendPath = (0, path_1.join)(__dirname, 'descarte', 'public');
    app.useStaticAssets(frontendPath);
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
//# sourceMappingURL=main.js.map