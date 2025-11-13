import { Repository } from 'typeorm';
import { DisposalRecord } from '../../entities/disposal-record.entity';
import { DisposalPoint, WasteCategory } from '../../entities/disposal-point.entity';
export declare class DisposalRecordsService {
    private disposalRecordRepository;
    private disposalPointRepository;
    constructor(disposalRecordRepository: Repository<DisposalRecord>, disposalPointRepository: Repository<DisposalPoint>);
    create(recordData: Partial<DisposalRecord>): Promise<DisposalRecord>;
    findAll(filters?: {
        disposalPointId?: number;
        wasteType?: WasteCategory;
        startDate?: Date;
        endDate?: Date;
        userName?: string;
    }): Promise<DisposalRecord[]>;
    getStatistics(): Promise<{
        mostActiveLocation: any;
        mostFrequentWaste: any;
        averageDisposalsPerDay: number;
        totalUsers: number;
        totalDisposalPoints: number;
        growthPercentage: number;
    }>;
}
