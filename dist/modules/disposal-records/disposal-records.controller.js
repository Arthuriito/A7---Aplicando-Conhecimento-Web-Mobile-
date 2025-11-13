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
exports.DisposalRecordsController = void 0;
const common_1 = require("@nestjs/common");
const disposal_records_service_1 = require("./disposal-records.service");
const disposal_point_entity_1 = require("../../entities/disposal-point.entity");
let DisposalRecordsController = class DisposalRecordsController {
    constructor(disposalRecordsService) {
        this.disposalRecordsService = disposalRecordsService;
    }
    async create(recordData) {
        if (recordData.wasteType) {
            const validValues = Object.values(disposal_point_entity_1.WasteCategory);
            const receivedValue = recordData.wasteType.toLowerCase().trim();
            const valueMap = {
                'plástico': 'plastic',
                'plastico': 'plastic',
                'papel': 'paper',
                'orgânico': 'organic',
                'organico': 'organic',
                'eletrônico': 'electronic',
                'eletronico': 'electronic',
                'vidro': 'glass',
                'metal': 'metal'
            };
            if (valueMap[receivedValue]) {
                recordData.wasteType = valueMap[receivedValue];
            }
            if (!validValues.includes(recordData.wasteType)) {
                throw new common_1.BadRequestException(`wasteType deve ser: ${validValues.join(', ')}. Recebido: "${recordData.wasteType}"`);
            }
        }
        const result = await this.disposalRecordsService.create(recordData);
        const reverseMap = {
            'plastic': 'plástico',
            'paper': 'papel',
            'organic': 'orgânico',
            'electronic': 'eletrônico',
            'glass': 'vidro',
            'metal': 'metal'
        };
        return {
            ...result,
            wasteType: reverseMap[result.wasteType] || result.wasteType
        };
    }
    async findAll(disposalPointId, wasteType, startDate, endDate, userName) {
        const filters = {};
        if (disposalPointId)
            filters.disposalPointId = parseInt(disposalPointId);
        if (wasteType) {
            const valueMap = {
                'plástico': 'plastic',
                'plastico': 'plastic',
                'papel': 'paper',
                'orgânico': 'organic',
                'organico': 'organic',
                'eletrônico': 'electronic',
                'eletronico': 'electronic',
                'vidro': 'glass',
                'metal': 'metal'
            };
            filters.wasteType = valueMap[wasteType.toLowerCase().trim()] || wasteType;
        }
        if (userName)
            filters.userName = userName;
        if (startDate)
            filters.startDate = new Date(startDate);
        if (endDate)
            filters.endDate = new Date(endDate);
        const records = await this.disposalRecordsService.findAll(filters);
        const reverseMap = {
            'plastic': 'plástico',
            'paper': 'papel',
            'organic': 'orgânico',
            'electronic': 'eletrônico',
            'glass': 'vidro',
            'metal': 'metal'
        };
        return records.map(record => ({
            ...record,
            wasteType: reverseMap[record.wasteType] || record.wasteType
        }));
    }
    async getReport() {
        const report = await this.disposalRecordsService.getStatistics();
        const reverseMap = {
            'plastic': 'plástico',
            'paper': 'papel',
            'organic': 'orgânico',
            'electronic': 'eletrônico',
            'glass': 'vidro',
            'metal': 'metal'
        };
        return {
            ...report,
            mostFrequentWaste: reverseMap[report.mostFrequentWaste] || report.mostFrequentWaste
        };
    }
};
exports.DisposalRecordsController = DisposalRecordsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DisposalRecordsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('disposalPointId')),
    __param(1, (0, common_1.Query)('wasteType')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __param(4, (0, common_1.Query)('userName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], DisposalRecordsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('relatorio'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DisposalRecordsController.prototype, "getReport", null);
exports.DisposalRecordsController = DisposalRecordsController = __decorate([
    (0, common_1.Controller)('disposal-records'),
    __metadata("design:paramtypes", [disposal_records_service_1.DisposalRecordsService])
], DisposalRecordsController);
//# sourceMappingURL=disposal-records.controller.js.map