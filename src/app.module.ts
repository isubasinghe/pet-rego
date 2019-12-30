import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { User } from './users/users.entity';
import { Pet } from './pets/pets.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [User, Pet],
      synchronize: true,
    }),
    UsersModule,
    PetsModule,
  ],
})
export class AppModule {}
