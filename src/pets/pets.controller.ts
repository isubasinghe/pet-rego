import { Controller, Post } from '@nestjs/common';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(private readonly petService: PetsService) {}

  @Post()
  addPet() {}
}
