import { DisposalRecord } from './disposal-record.entity';
export declare class DisposalPoint {
    id: number;
    name: string;
    neighborhood: string;
    locationType: string;
    acceptedCategories: string[];
    latitude: number;
    longitude: number;
    records: DisposalRecord[];
    createdAt: Date;
}
export declare enum LocationType {
    PUBLIC = "public",
    PRIVATE = "private"
}
export declare enum WasteCategory {
    PLASTIC = "plastic",
    PAPER = "paper",
    ORGANIC = "organic",
    ELECTRONIC = "electronic",
    GLASS = "glass",
    METAL = "metal"
}
