import { Controller, Post, Get, Body, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { ValidationPipe } from '../shared/validation';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { User } from './users.entity';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: User })
  addUser(@Body() user: CreateUserDTO) {
    return this.usersService.create(user).then(user => {
      const { pets, ...rest } = user;
      return { ...rest };
    });
  }
}
