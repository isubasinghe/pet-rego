import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { Pet } from './pets.entity';
import { CreatePetDTO } from './dtos/create-pet.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private readonly petsRepository: Repository<Pet>,
  ) {}

  async getAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }

  async create(dto: CreatePetDTO) {
    const pet = new Pet();
    const user = new User();
    user.id = dto.ownerId;
    pet.user = user;
    pet.name = dto.name;
    pet.type = dto.type;
    const errors = await validate(pet);
    if (errors.length > 0) {
      // TODO handle validation error
    } else {
      return this.petsRepository.save(pet);
    }
  }
}
