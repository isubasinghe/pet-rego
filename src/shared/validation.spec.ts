import { ValidationPipe } from './validation';
import { CreateUserDTO } from '../users/dtos/create-user.dto';
import { CreatePetDTO } from '../pets/dtos/create-pet.dto';

let validation: ValidationPipe;
validation = new ValidationPipe();

describe('Validation of CreateUserDTO', () => {
  it('should pass with correct schema', async () => {
    const userDTO = new CreateUserDTO();
    userDTO.email = 'asd@asd.com';
    userDTO.name = 'ASD';
    const validatedDTO = await validation.transform(userDTO, {
      metatype: CreateUserDTO,
      type: 'body',
    });
    expect(userDTO).toBe(validatedDTO);
  });

  it('should fail with missing schema', async () => {
    const userDTO = new CreateUserDTO();
    userDTO.email = 'asd@asd.com';
    const validatedDTOPromise = validation.transform(userDTO, {
      metatype: CreateUserDTO,
      type: 'body',
    });
    expect(validatedDTOPromise).rejects.toThrow();
  });

  it('should fail with invalid schema', async () => {
    const userDTO = new CreateUserDTO();
    userDTO.email = 'asd@asd.com';
    // Disable typescript here to test our DTOs
    // @ts-ignore
    userDTO.name = 1;
    const validatedDTOPromise = validation.transform(userDTO, {
      metatype: CreateUserDTO,
      type: 'body',
    });
    expect(validatedDTOPromise).rejects.toThrow();
  });
});

describe('Validation of CreatePetDTO', () => {
  it('should pass with correct schema', async () => {
    const petDTO = new CreatePetDTO();
    petDTO.name = 'Spot';
    petDTO.ownerId = 1;
    petDTO.type = 'DOG';

    const validatedDTO = await validation.transform(petDTO, {
      metatype: CreatePetDTO,
      type: 'body',
    });
    expect(petDTO).toBe(validatedDTO);
  });

  it('should fail with incorrect schmea', async () => {
    const petDTO = new CreatePetDTO();
    // Disable typescript for testing
    // @ts-ignore
    petDTO.name = 1;
    petDTO.ownerId = 1;
    petDTO.type = 'DOG';

    const validatedDTOPromise = validation.transform(petDTO, {
      metatype: CreatePetDTO,
      type: 'body',
    });

    expect(validatedDTOPromise).rejects.toThrow();
  });

  it('should fail with incomplete schema', async () => {
    const petDTO = new CreatePetDTO();

    petDTO.ownerId = 1;
    petDTO.type = 'DOG';

    const validatedDTOPromise = validation.transform(petDTO, {
      metatype: CreatePetDTO,
      type: 'body',
    });

    expect(validatedDTOPromise).rejects.toThrow();
  });
});
