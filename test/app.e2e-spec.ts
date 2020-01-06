import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepository } from 'typeorm';
import { User } from '../src/users/users.entity';
import { Pet } from '../src/pets/pets.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await getRepository(Pet).query('DELETE FROM pet');

    // id's are always greater than 0
    // we are essentially writing out some SQL here to delete all users.
    await getRepository(User)
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id > 0')
      .execute();
  });

  it('/v1/users/create (POST)', () => {
    return request(app.getHttpServer())
      .post('/v1/users/create')
      .send({ email: 'asd@aasda.com', name: 'asd' })
      .expect(201);
  });

  it('/v1/pets/create (POST)', done => {
    const agent = request(app.getHttpServer());
    let id = null;
    agent
      .post('/v1/users/create')
      .send({ email: 'asd@aasda.com', name: 'asd' })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        agent
          .post('/v1/pets/create')
          .send({ ownerId: res.body.id, name: 'spot', type: 'DOG' })
          .expect(201);
        done();
      });
  });
});
