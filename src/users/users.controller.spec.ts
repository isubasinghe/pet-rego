import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './users.entity';
import { CreateUserDTO } from './dtos/create-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockRepository = {};

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        UsersService,
      ],
    }).compile();
    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create a user with valid body', () => {
    it('should return the User', async () => {
      const email = 'asd@asd.com';
      const name = 'ASD";';
      const result: Promise<User> = new Promise(resolve =>
        resolve({ id: 1, email, name, pets: [] }),
      );
      jest.spyOn(usersService, 'create').mockImplementation(() => result);

      const userDTO = new CreateUserDTO();
      userDTO.email = email;
      userDTO.name = name;

      const savedUser = await usersController.addUser(userDTO);
      expect(savedUser.email).toBe(email);
      expect(savedUser.name).toBe(name);
    });
  });

  // Testing for creation user with invalid body will have
  // to be done in E2E tests, this is because @UsePipes(new ValidationPipe) does
  // not seem to be injected.
});
