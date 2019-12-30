import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { User } from './users/users.entity';
import { Pet } from './pets/pets.entity';
import { getDatabaseConnectionOptions } from './config/secrets';

const dbConnectOptions = getDatabaseConnectionOptions();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbConnectOptions.HOST,
      port: 5432,
      username: dbConnectOptions.USERNAME,
      password: dbConnectOptions.PASSWORD,
      database: dbConnectOptions.DATABASE,
      entities: [User, Pet],
      synchronize: true,
    }),
    UsersModule,
    PetsModule,
  ],
})
export class AppModule {}
