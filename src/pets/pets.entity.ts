import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(
    type => User,
    user => user.pets,
  )
  user: User;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  type: string;
}
