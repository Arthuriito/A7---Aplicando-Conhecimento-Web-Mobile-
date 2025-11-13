import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DisposalRecord } from './disposal-record.entity';

export enum WasteCategory {
  PLASTIC = 'plástico',
  PAPER = 'papel',
  ORGANIC = 'orgânico',
  ELECTRONIC = 'eletrônico',
  GLASS = 'vidro',
  METAL = 'metal'
}

export enum LocationType {
  PUBLIC = 'público',
  PRIVATE = 'privado'
}

@Entity()
export class DisposalPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  neighborhood: string;

  @Column({
    type: 'text',
    enum: LocationType
  })
  locationType: LocationType;

  @Column({
    type: 'text',
    array: true
  })
  acceptedCategories: WasteCategory[];

  @Column('decimal', { precision: 10, scale: 6 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 6 })
  longitude: number;

  @OneToMany(() => DisposalRecord, record => record.disposalPoint)
  records: DisposalRecord[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}