import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DisposalPoint, WasteCategory } from './disposal-point.entity';

@Entity()
export class DisposalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @ManyToOne(() => DisposalPoint)
  @JoinColumn({ name: 'disposalPointId' })
  disposalPoint: DisposalPoint;

  @Column()
  disposalPointId: number;

  @Column({
    type: 'text',
    enum: WasteCategory
  })
  wasteType: WasteCategory;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  disposalDate: Date;
}