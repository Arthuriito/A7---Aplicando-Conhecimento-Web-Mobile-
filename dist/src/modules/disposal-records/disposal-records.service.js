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
exports.DisposalRecordsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const disposal_record_entity_1 = require("../../entities/disposal-record.entity");
const disposal_point_entity_1 = require("../../entities/disposal-point.entity");
let DisposalRecordsService = class DisposalRecordsService {
    constructor(disposalRecordRepository, disposalPointRepository) {
        this.disposalRecordRepository = disposalRecordRepository;
        this.disposalPointRepository = disposalPointRepository;
    }
    async create(recordData) {
        const record = this.disposalRecordRepository.create(recordData);
        return await this.disposalRecordRepository.save(record);
    }
    async findAll(filters) {
        const where = {};
        if (filters?.disposalPointId) {
            where.disposalPointId = filters.disposalPointId;
        }
        if (filters?.wasteType) {
            where.wasteType = filters.wasteType;
        }
        if (filters?.userName) {
            where.userName = filters.userName;
        }
        if (filters?.startDate && filters?.endDate) {
            where.disposalDate = (0, typeorm_2.Between)(filters.startDate, filters.endDate);
        }
        else if (filters?.startDate) {
            where.disposalDate = (0, typeorm_2.MoreThanOrEqual)(filters.startDate);
        }
        return await this.disposalRecordRepository.find({
            where,
            relations: ['disposalPoint'],
            order: { disposalDate: 'DESC' }
        });
    }
    async getStatistics() {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const lastMonthStart = new Date();
        lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
        lastMonthStart.setDate(1);
        lastMonthStart.setHours(0, 0, 0, 0);
        const currentMonthStart = new Date();
        currentMonthStart.setDate(1);
        currentMonthStart.setHours(0, 0, 0, 0);
        const lastMonthEnd = new Date(currentMonthStart);
        lastMonthEnd.setDate(lastMonthEnd.getDate() - 1);
        const mostActiveLocation = await this.disposalRecordRepository
            .createQueryBuilder('record')
            .select('disposalPoint.name', 'locationName')
            .addSelect('COUNT(record.id)', 'recordCount')
            .innerJoin('record.disposalPoint', 'disposalPoint')
            .groupBy('record.disposalPointId')
            .orderBy('recordCount', 'DESC')
            .limit(1)
            .getRawOne();
        const mostFrequentWaste = await this.disposalRecordRepository
            .createQueryBuilder('record')
            .select('record.wasteType', 'wasteType')
            .addSelect('COUNT(record.id)', 'count')
            .groupBy('record.wasteType')
            .orderBy('count', 'DESC')
            .limit(1)
            .getRawOne();
        const last30DaysRecords = await this.disposalRecordRepository
            .createQueryBuilder('record')
            .where('record.disposalDate >= :thirtyDaysAgo', { thirtyDaysAgo })
            .getMany();
        const daysCount = 30;
        const averagePerDay = last30DaysRecords.length / daysCount;
        const totalUsers = await this.disposalRecordRepository
            .createQueryBuilder('record')
            .select('COUNT(DISTINCT record.userName)', 'count')
            .getRawOne();
        const totalDisposalPoints = await this.disposalPointRepository.count();
        const lastMonthRecords = await this.disposalRecordRepository
            .createQueryBuilder('record')
            .where('record.disposalDate BETWEEN :lastMonthStart AND :lastMonthEnd', {
            lastMonthStart,
            lastMonthEnd
        })
            .getCount();
        const currentMonthRecords = await this.disposalRecordRepository
            .createQueryBuilder('record')
            .where('record.disposalDate >= :currentMonthStart', { currentMonthStart })
            .getCount();
        let growthPercentage = 0;
        if (lastMonthRecords > 0) {
            growthPercentage = ((currentMonthRecords - lastMonthRecords) / lastMonthRecords) * 100;
        }
        return {
            mostActiveLocation: mostActiveLocation?.locationName || 'Nenhum registro',
            mostFrequentWaste: mostFrequentWaste?.wasteType || 'Nenhum registro',
            averageDisposalsPerDay: parseFloat(averagePerDay.toFixed(2)),
            totalUsers: parseInt(totalUsers.count) || 0,
            totalDisposalPoints,
            growthPercentage: parseFloat(growthPercentage.toFixed(2))
        };
    }
};
exports.DisposalRecordsService = DisposalRecordsService;
exports.DisposalRecordsService = DisposalRecordsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(disposal_record_entity_1.DisposalRecord)),
    __param(1, (0, typeorm_1.InjectRepository)(disposal_point_entity_1.DisposalPoint)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DisposalRecordsService);
//# sourceMappingURL=disposal-records.service.js.map