import { Controller, Post, Body, Get, Param, UsePipes } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDTO } from './dtos/create-pet.dto';
import { ValidationPipe } from '../shared/validation';
import { ApiCreatedResponse, ApiAcceptedResponse } from '@nestjs/swagger';
import { Pet } from './pets.entity';

@Controller('v1/pets')
export class PetsController {
  constructor(private readonly petService: PetsService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: Pet })
  addPet(@Body() pet: CreatePetDTO) {
    return this.petService.create(pet).then(pet => {
      const { user, ...rest } = pet;
      return { ...rest };
    });
  }

  // The id is not needed when we add auth
  // it is safer for us to obtain the id ourselves.
  // In order to minimise db queries, we could either
  // store the id in the JWT token (custom claims), or since email's are uniquely indexed,
  // use the email field from our JWT token.
  @Get(':ownerId')
  @ApiAcceptedResponse({ type: [Pet] })
  fetchPets(@Param('ownerId') ownerId: string) {
    const parsedOwnerId = parseInt(ownerId);

    return this.petService.getAll(parsedOwnerId);
  }
}
