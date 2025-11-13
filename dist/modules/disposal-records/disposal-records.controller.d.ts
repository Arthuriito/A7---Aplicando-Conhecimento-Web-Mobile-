import { DisposalRecordsService } from './disposal-records.service';
import { DisposalRecord } from '../../entities/disposal-record.entity';
export declare class DisposalRecordsController {
    private readonly disposalRecordsService;
    constructor(disposalRecordsService: DisposalRecordsService);
    create(recordData: Partial<DisposalRecord>): Promise<{
        wasteType: string;
        id: number;
        userName: string;
        disposalPoint: import("../../entities/disposal-point.entity").DisposalPoint;
        disposalPointId: number;
        disposalDate: Date;
    }>;
    findAll(disposalPointId?: string, wasteType?: string, startDate?: string, endDate?: string, userName?: string): Promise<{
        wasteType: string;
        id: number;
        userName: string;
        disposalPoint: import("../../entities/disposal-point.entity").DisposalPoint;
        disposalPointId: number;
        disposalDate: Date;
    }[]>;
    getReport(): Promise<{
        mostFrequentWaste: any;
        mostActiveLocation: any;
        averageDisposalsPerDay: number;
        totalUsers: number;
        totalDisposalPoints: number;
        growthPercentage: number;
    }>;
}
