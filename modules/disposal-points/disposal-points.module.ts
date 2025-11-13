import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisposalPointsService } from './disposal-points.service';
import { DisposalPointsController } from './disposal-points.controller';
import { DisposalPoint } from '../../entities/disposal-point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DisposalPoint])],
  providers: [DisposalPointsService],
  controllers: [DisposalPointsController],
  exports: [DisposalPointsService],
})
export class DisposalPointsModule {}