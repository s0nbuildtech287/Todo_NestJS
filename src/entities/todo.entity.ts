import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  description: string;

  @Column({ length: 255 })
  status: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
