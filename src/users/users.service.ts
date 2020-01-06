import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDTO } from './dtos/create-user.dto';

const EMAIL_ALREADY_EXISTS_ERROR_CODE = '23505';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getPets(id: number): Promise<any> {
    // primary keys are unique so this should be fine.
    return (await this.userRepository.findOne({ id })).pets;
  }

  async create(dto: CreateUserDTO): Promise<User> {
    const user = new User();
    user.email = dto.email;
    user.name = dto.name;
    user.pets = [];

    try {
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch (error) {
      if (error.code === EMAIL_ALREADY_EXISTS_ERROR_CODE) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
