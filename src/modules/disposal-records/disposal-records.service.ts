import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual } from 'typeorm';
import { DisposalRecord } from '../../entities/disposal-record.entity';
import { DisposalPoint, WasteCategory } from '../../entities/disposal-point.entity';

@Injectable()
export class DisposalRecordsService {
  constructor(
    @InjectRepository(DisposalRecord)
    private disposalRecordRepository: Repository<DisposalRecord>,
    @InjectRepository(DisposalPoint)
    private disposalPointRepository: Repository<DisposalPoint>,
  ) {}

  async create(recordData: Partial<DisposalRecord>): Promise<DisposalRecord> {
    const record = this.disposalRecordRepository.create(recordData);
    return await this.disposalRecordRepository.save(record);
  }

  async findAll(filters?: {
    disposalPointId?: number;
    wasteType?: WasteCategory;
    startDate?: Date;
    endDate?: Date;
    userName?: string;
  }): Promise<DisposalRecord[]> {
    const where: any = {};

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
      where.disposalDate = Between(filters.startDate, filters.endDate);
    } else if (filters?.startDate) {
      where.disposalDate = MoreThanOrEqual(filters.startDate);
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

    // Local com maior número de registros
    const mostActiveLocation = await this.disposalRecordRepository
      .createQueryBuilder('record')
      .select('disposalPoint.name', 'locationName')
      .addSelect('COUNT(record.id)', 'recordCount')
      .innerJoin('record.disposalPoint', 'disposalPoint')
      .groupBy('record.disposalPointId')
      .orderBy('recordCount', 'DESC')
      .limit(1)
      .getRawOne();

    // Tipo de resíduo mais frequente
    const mostFrequentWaste = await this.disposalRecordRepository
      .createQueryBuilder('record')
      .select('record.wasteType', 'wasteType')
      .addSelect('COUNT(record.id)', 'count')
      .groupBy('record.wasteType')
      .orderBy('count', 'DESC')
      .limit(1)
      .getRawOne();

    // Média de descartes por dia (últimos 30 dias)
    const last30DaysRecords = await this.disposalRecordRepository
      .createQueryBuilder('record')
      .where('record.disposalDate >= :thirtyDaysAgo', { thirtyDaysAgo })
      .getMany();

    const daysCount = 30;
    const averagePerDay = last30DaysRecords.length / daysCount;

    // Número total de usuários únicos
    const totalUsers = await this.disposalRecordRepository
      .createQueryBuilder('record')
      .select('COUNT(DISTINCT record.userName)', 'count')
      .getRawOne();

    // Total de pontos de descarte
    const totalDisposalPoints = await this.disposalPointRepository.count();

    // Percentual de crescimento/redução comparado ao mês anterior
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
}