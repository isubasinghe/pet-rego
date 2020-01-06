import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsPet } from '../pet.validation';

export class CreatePetDTO {
  @ApiProperty()
  @IsNumber()
  // This isnt needed when authentication is implemented.
  // we can obtain this using the JWT token.
  ownerId: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsPet()
  type: string;
}
