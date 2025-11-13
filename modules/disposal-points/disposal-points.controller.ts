import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DisposalPointsService } from './disposal-points.service';
import { DisposalPoint, LocationType, WasteCategory } from '../../entities/disposal-point.entity';

@Controller('disposal-points')
export class DisposalPointsController {
  constructor(private readonly disposalPointsService: DisposalPointsService) {}

  @Post()
  async create(@Body() disposalPointData: Partial<DisposalPoint>) {
    return await this.disposalPointsService.create(disposalPointData);
  }

  @Get()
  async findAll() {
    return await this.disposalPointsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.disposalPointsService.findOne(+id);
  }
}