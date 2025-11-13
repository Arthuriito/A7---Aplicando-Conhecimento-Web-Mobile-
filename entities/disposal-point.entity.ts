import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DisposalRecord } from './disposal-record.entity';

@Entity('disposal_points')
export class DisposalPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  neighborhood: string;

  @Column({ type: 'text' })
  locationType: string;

  @Column('simple-array')
  acceptedCategories: string[];

  @Column('decimal', { precision: 10, scale: 6 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 6 })
  longitude: number;

  @OneToMany(() => DisposalRecord, record => record.disposalPoint)
  records: DisposalRecord[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

// Enums simplificados - usando valores em inglês para evitar problemas de encoding
export enum LocationType {
  PUBLIC = 'public',
  PRIVATE = 'private'
}

export enum WasteCategory {
  PLASTIC = 'plastic',
  PAPER = 'paper',
  ORGANIC = 'organic',
  ELECTRONIC = 'electronic',
  GLASS = 'glass',
  METAL = 'metal'
}