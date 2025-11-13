import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DisposalPoint, LocationType, WasteCategory } from '../../entities/disposal-point.entity';

@Injectable()
export class DisposalPointsService {
  constructor(
    @InjectRepository(DisposalPoint)
    private disposalPointRepository: Repository<DisposalPoint>,
  ) {}

  async create(disposalPointData: Partial<DisposalPoint>): Promise<DisposalPoint> {
    const disposalPoint = this.disposalPointRepository.create(disposalPointData);
    return await this.disposalPointRepository.save(disposalPoint);
  }

  async findAll(): Promise<DisposalPoint[]> {
    return await this.disposalPointRepository.find({
      relations: ['records']
    });
  }

  async findOne(id: number): Promise<DisposalPoint> {
    return await this.disposalPointRepository.findOne({
      where: { id },
      relations: ['records']
    });
  }

  async getTotalCount(): Promise<number> {
    return await this.disposalPointRepository.count();
  }
}