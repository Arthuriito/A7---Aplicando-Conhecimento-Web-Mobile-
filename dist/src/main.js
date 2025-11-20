"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'), {
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
//# sourceMappingURL=main.js.map