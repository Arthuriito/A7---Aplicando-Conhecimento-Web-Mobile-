import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisposalRecordsService } from './disposal-records.service';
import { DisposalRecordsController } from './disposal-records.controller';
import { DisposalRecord } from '../../entities/disposal-record.entity';
import { DisposalPoint } from '../../entities/disposal-point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DisposalRecord, DisposalPoint])],
  providers: [DisposalRecordsService],
  controllers: [DisposalRecordsController],
  exports: [DisposalRecordsService],
})
export class DisposalRecordsModule {}