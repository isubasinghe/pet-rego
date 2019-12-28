import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDTO } from './dtos/create-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petService: PetsService) {}

  @Post('create')
  addPet(@Body() pet: CreatePetDTO) {
    return this.petService.create(pet);
  }

  // The id is not needed when we add auth
  // it is safer for us to obtain the id ourselves.
  // In order to minimise db queries, we could either
  // store the id in the JWT token (custom claims), or since email's are uniquely indexed,
  // use the email from our JWT token.
  @Get(':ownerId')
  fetchPets(@Param('ownerId') ownerId: string) {
    const parsedOwnerId = parseInt(ownerId);
    if (isNaN(parsedOwnerId)) {
      // TODO Handle a parse failure
      return;
    } else {
      return this.petService.getAll(parsedOwnerId);
    }
  }
}
