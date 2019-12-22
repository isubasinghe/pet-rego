import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDTO } from './dtos/create-user.dto';
import { AddPetDTO } from './dtos/add-pet.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDTO) {
    const user = new User();
    user.email = dto.email;
    user.name = dto.name;
    user.pets = [];
    const errors = await validate(user);
    if (errors.length > 0) {
      // TODO handle validation error
    } else {
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    }
  }
}
