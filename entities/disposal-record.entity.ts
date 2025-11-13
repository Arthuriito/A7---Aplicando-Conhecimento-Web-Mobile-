import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DisposalPoint } from './disposal-point.entity';

@Entity('disposal_records')
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

  @Column('text') // String simples
  wasteType: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  disposalDate: Date;
}