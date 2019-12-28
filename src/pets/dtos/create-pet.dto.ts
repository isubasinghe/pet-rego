import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePetDTO {
  @IsNumber()
  ownerId: number;

  @IsString()
  name: string;

  @IsString()
  type: string;
}
