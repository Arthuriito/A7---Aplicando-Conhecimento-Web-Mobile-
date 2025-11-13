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
exports.DisposalPointsController = void 0;
const common_1 = require("@nestjs/common");
const disposal_points_service_1 = require("./disposal-points.service");
let DisposalPointsController = class DisposalPointsController {
    constructor(disposalPointsService) {
        this.disposalPointsService = disposalPointsService;
    }
    async create(disposalPointData) {
        console.log('Dados recebidos RAW:', disposalPointData);
        console.log('LocationType recebido:', disposalPointData.locationType);
        console.log('Tipo:', typeof disposalPointData.locationType);
        if (disposalPointData.locationType) {
            const receivedValue = disposalPointData.locationType.toString().toLowerCase().trim();
            console.log('Valor normalizado:', receivedValue);
            const locationMap = {
                'publico': 'public',
                'público': 'public',
                'public': 'public',
                'p�blico': 'public',
                'privado': 'private',
                'private': 'private',
                'privad': 'private',
                'p�blic': 'public'
            };
            const mappedValue = locationMap[receivedValue];
            if (mappedValue) {
                disposalPointData.locationType = mappedValue;
                console.log('Valor mapeado para:', mappedValue);
            }
            else {
                throw new common_1.BadRequestException(`locationType inválido. Use "public" ou "private". Recebido: "${disposalPointData.locationType}"`);
            }
        }
        if (disposalPointData.acceptedCategories) {
            const categoryMap = {
                'plástico': 'plastic',
                'plastico': 'plastic',
                'plastic': 'plastic',
                'papel': 'paper',
                'paper': 'paper',
                'orgânico': 'organic',
                'organico': 'organic',
                'organic': 'organic',
                'eletrônico': 'electronic',
                'eletronico': 'electronic',
                'electronic': 'electronic',
                'vidro': 'glass',
                'glass': 'glass',
                'metal': 'metal',
                'metAL': 'metal'
            };
            disposalPointData.acceptedCategories = disposalPointData.acceptedCategories.map(cat => {
                const normalizedCat = cat.toString().toLowerCase().trim();
                const mappedCat = categoryMap[normalizedCat];
                if (!mappedCat) {
                    throw new common_1.BadRequestException(`Categoria inválida: "${cat}". Use: plastic, paper, organic, electronic, glass, metal`);
                }
                return mappedCat;
            });
            console.log('Categorias mapeadas:', disposalPointData.acceptedCategories);
        }
        console.log('Dados FINAIS para salvar:', disposalPointData);
        return await this.disposalPointsService.create(disposalPointData);
    }
    async findAll() {
        const points = await this.disposalPointsService.findAll();
        return points.map(point => ({
            ...point,
            locationType: point.locationType === 'public' ? 'público' : 'privado',
            acceptedCategories: point.acceptedCategories.map(cat => {
                const reverseMap = {
                    'plastic': 'plástico',
                    'paper': 'papel',
                    'organic': 'orgânico',
                    'electronic': 'eletrônico',
                    'glass': 'vidro',
                    'metal': 'metal'
                };
                return reverseMap[cat] || cat;
            })
        }));
    }
    async findOne(id) {
        const point = await this.disposalPointsService.findOne(+id);
        if (point) {
            return {
                ...point,
                locationType: point.locationType === 'public' ? 'público' : 'privado',
                acceptedCategories: point.acceptedCategories.map(cat => {
                    const reverseMap = {
                        'plastic': 'plástico',
                        'paper': 'papel',
                        'organic': 'orgânico',
                        'electronic': 'eletrônico',
                        'glass': 'vidro',
                        'metal': 'metal'
                    };
                    return reverseMap[cat] || cat;
                })
            };
        }
        return point;
    }
};
exports.DisposalPointsController = DisposalPointsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DisposalPointsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DisposalPointsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DisposalPointsController.prototype, "findOne", null);
exports.DisposalPointsController = DisposalPointsController = __decorate([
    (0, common_1.Controller)('disposal-points'),
    __metadata("design:paramtypes", [disposal_points_service_1.DisposalPointsService])
], DisposalPointsController);
//# sourceMappingURL=disposal-points.controller.js.map