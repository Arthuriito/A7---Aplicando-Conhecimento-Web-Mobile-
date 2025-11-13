import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DisposalRecordsService } from './disposal-records.service';
import { DisposalRecord } from '../../entities/disposal-record.entity';
import { WasteCategory } from '../../entities/disposal-point.entity';

@Controller('disposal-records')
export class DisposalRecordsController {
  constructor(private readonly disposalRecordsService: DisposalRecordsService) {}

  @Post()
  async create(@Body() recordData: Partial<DisposalRecord>) {
    return await this.disposalRecordsService.create(recordData);
  }

  @Get()
  async findAll(
    @Query('disposalPointId') disposalPointId?: string,
    @Query('wasteType') wasteType?: WasteCategory,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('userName') userName?: string,
  ) {
    const filters: any = {};

    if (disposalPointId) filters.disposalPointId = parseInt(disposalPointId);
    if (wasteType) filters.wasteType = wasteType;
    if (userName) filters.userName = userName;
    if (startDate) filters.startDate = new Date(startDate);
    if (endDate) filters.endDate = new Date(endDate);

    return await this.disposalRecordsService.findAll(filters);
  }

  @Get('relatorio')
  async getReport() {
    return await this.disposalRecordsService.getStatistics();
  }
}