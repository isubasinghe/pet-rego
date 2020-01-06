import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pets.entity';
import { CreatePetDTO } from './dtos/create-pet.dto';
import { User } from '../users/users.entity';
import { isNumber } from 'util';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private readonly petsRepository: Repository<Pet>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAll(ownerId: number): Promise<Pet[]> {
    if (isNaN(ownerId) || !isNumber(ownerId)) {
      throw new HttpException(
        'Invalid ownerId, ownerId must be of type number',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.findOne({ id: ownerId });
    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.petsRepository.find({ user });
  }

  async create(dto: CreatePetDTO) {
    const pet = new Pet();

    const user = await this.userRepository.findOne({ id: dto.ownerId });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    pet.user = user;
    pet.name = dto.name;
    pet.type = dto.type;

    const savedPet = await this.petsRepository.save(pet);
    if (savedPet) {
      return savedPet;
    } else {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
