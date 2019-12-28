import { Controller, Post, Body } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDTO } from './dtos/create-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petService: PetsService) {}

  @Post()
  addPet(@Body() pet: CreatePetDTO) {
    return this.petService.create(pet);
  }
}
