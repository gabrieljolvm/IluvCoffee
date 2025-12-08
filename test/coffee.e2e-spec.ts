import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { CoffeesModule } from '../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto/create-coffee.dto';

const coffee: CreateCoffeeDto = {
  name: 'Café Preto',
  brand: 'Pilão',
  description: 'O café mais tradicional do Brasil',
  flavors: ['traditional', 'vanilla'],
};

describe('[Feature] Coffees - /coffees (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DATABASE_HOST,
          port: 5433,
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          autoLoadEntities: true,
          synchronize: process.env.NODE_ENV !== 'production',
          dropSchema: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/coffees (POST)', () => {
    return (
      request(app.getHttpServer())
        .post('/coffees')
        // .set('Authorization', process.env.API_KEY)
        .send(coffee)
        .expect(HttpStatus.CREATED)
    );
  });

  it('/coffees (GET)', () => {
    return request(app.getHttpServer())
      .get('/coffees')
      .expect(200)
      .expect([
        {
          id: 1,
          name: 'Café Preto',
          description: 'O café mais tradicional do Brasil',
          brand: 'Pilão',
          recommendations: 0,
          flavors: [
            { id: 1, name: 'traditional' },
            { id: 2, name: 'vanilla' },
          ],
        },
      ]);
  });

  it('coffees/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/coffees/1')
      .expect(HttpStatus.OK)
      .expect({
        id: 1,
        name: 'Café Preto',
        description: 'O café mais tradicional do Brasil',
        brand: 'Pilão',
        recommendations: 0,
        flavors: [
          { id: 1, name: 'traditional' },
          { id: 2, name: 'vanilla' },
        ],
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
