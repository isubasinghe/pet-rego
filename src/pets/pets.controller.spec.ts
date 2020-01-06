import { Test } from '@nestjs/testing';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { Pet } from './pets.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/users.entity';

describe('PetsController', () => {
  let petsController: PetsController;
  let petsService: PetsService;

  const mockRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [PetsController],
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Pet),
          useValue: mockRepository,
        },
        PetsService,
      ],
    }).compile();
    petsController = module.get<PetsController>(PetsController);
    petsService = module.get<PetsService>(PetsService);
  });

  describe('fetchPets', () => {
    it('should return an array of pets', async () => {
      const result: Promise<Partial<Pet>[]> = new Promise(resolve =>
        resolve([{ id: 1, name: 'Spot', type: 'DOG' }]),
      );
      jest.spyOn(petsService, 'getAll').mockImplementation(() => result);
      console.log(await petsController.fetchPets('1'));
      expect(await petsController.fetchPets('1')).toBe(await result);
    });
  });
});
