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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
let AppController = class AppController {
    getHome(res) {
        return res.sendFile((0, path_1.join)(__dirname, '../../public/index.html'));
    }
    getCadastroPonto(res) {
        return res.sendFile((0, path_1.join)(__dirname, '../../public/cadastro-ponto.html'));
    }
    getRegistroDescarte(res) {
        return res.sendFile((0, path_1.join)(__dirname, '../../public/registro-descarte.html'));
    }
    getConsultaHistorico(res) {
        return res.sendFile((0, path_1.join)(__dirname, '../../public/consulta-historico.html'));
    }
    getRelatorios(res) {
        return res.sendFile((0, path_1.join)(__dirname, '../../public/relatorios.html'));
    }
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
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHome", null);
__decorate([
    (0, common_1.Get)('cadastro-ponto'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCadastroPonto", null);
__decorate([
    (0, common_1.Get)('registro-descarte'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getRegistroDescarte", null);
__decorate([
    (0, common_1.Get)('consulta-historico'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getConsultaHistorico", null);
__decorate([
    (0, common_1.Get)('relatorios'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getRelatorios", null);
__decorate([
    (0, common_1.Get)('api'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getApiInfo", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=app.controller.js.map