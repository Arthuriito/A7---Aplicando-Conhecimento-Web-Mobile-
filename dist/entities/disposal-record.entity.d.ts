import { DisposalPoint } from './disposal-point.entity';
export declare class DisposalRecord {
    id: number;
    userName: string;
    disposalPoint: DisposalPoint;
    disposalPointId: number;
    wasteType: string;
    disposalDate: Date;
}
