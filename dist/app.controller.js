"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
let AppController = class AppController {
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
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=app.controller.js.map