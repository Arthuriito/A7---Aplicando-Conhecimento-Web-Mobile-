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
exports.DisposalPointsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const disposal_point_entity_1 = require("../../entities/disposal-point.entity");
let DisposalPointsService = class DisposalPointsService {
    constructor(disposalPointRepository) {
        this.disposalPointRepository = disposalPointRepository;
    }
    async create(disposalPointData) {
        const disposalPoint = this.disposalPointRepository.create(disposalPointData);
        return await this.disposalPointRepository.save(disposalPoint);
    }
    async findAll() {
        return await this.disposalPointRepository.find({
            relations: ['records']
        });
    }
    async findOne(id) {
        return await this.disposalPointRepository.findOne({
            where: { id },
            relations: ['records']
        });
    }
    async getTotalCount() {
        return await this.disposalPointRepository.count();
    }
};
exports.DisposalPointsService = DisposalPointsService;
exports.DisposalPointsService = DisposalPointsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(disposal_point_entity_1.DisposalPoint)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DisposalPointsService);
//# sourceMappingURL=disposal-points.service.js.map