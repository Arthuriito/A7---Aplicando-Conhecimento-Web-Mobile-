import { DisposalPointsService } from './disposal-points.service';
import { DisposalPoint } from '../../entities/disposal-point.entity';
export declare class DisposalPointsController {
    private readonly disposalPointsService;
    constructor(disposalPointsService: DisposalPointsService);
    create(disposalPointData: Partial<DisposalPoint>): Promise<DisposalPoint>;
    findAll(): Promise<{
        locationType: string;
        acceptedCategories: string[];
        id: number;
        name: string;
        neighborhood: string;
        latitude: number;
        longitude: number;
        records: import("../../entities/disposal-record.entity").DisposalRecord[];
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<DisposalPoint>;
}
