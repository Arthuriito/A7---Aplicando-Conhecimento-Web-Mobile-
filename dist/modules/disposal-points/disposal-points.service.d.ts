import { Repository } from 'typeorm';
import { DisposalPoint } from '../../entities/disposal-point.entity';
export declare class DisposalPointsService {
    private disposalPointRepository;
    constructor(disposalPointRepository: Repository<DisposalPoint>);
    create(disposalPointData: Partial<DisposalPoint>): Promise<DisposalPoint>;
    findAll(): Promise<DisposalPoint[]>;
    findOne(id: number): Promise<DisposalPoint>;
    getTotalCount(): Promise<number>;
}
