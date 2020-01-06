import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { Pet } from '../pets/pets.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @Index({ unique: true })
  @ApiProperty()
  email: string;

  @OneToMany(
    type => Pet,
    pet => pet.user,
  )
  @ApiProperty()
  pets: Pet[];
}
