import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { FrontendController } from './frontend.controller'; // ← ADICIONE ESTA LINHA
import { DisposalPointsModule } from './modules/disposal-points/disposal-points.module';
import { DisposalRecordsModule } from './modules/disposal-records/disposal-records.module';
import { DisposalPoint } from './entities/disposal-point.entity';
import { DisposalRecord } from './entities/disposal-record.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [DisposalPoint, DisposalRecord],
      synchronize: true,
    }),
    DisposalPointsModule,
    DisposalRecordsModule,
  ],
  controllers: [AppController, FrontendController], // ← ADICIONE FrontendController aqui
})
export class AppModule {}