/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('CountriesCqrsController (e2e)', () => {
  let app: INestApplication;
  let createdCountry: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/countriescqrs (POST) should create a country', async () => {
    const response = await request(app.getHttpServer())
      .post('/countriescqrs')
      .send({ name: 'Test Country' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test Country');
    createdCountry = response.body;
  });

  it('/countriescqrs (GET) should get all countries', async () => {
    const response = await request(app.getHttpServer())
      .get('/countriescqrs')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('/countriescqrs/:id (GET) should get country by id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/countriescqrs/${createdCountry.id}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdCountry.id);
    expect(response.body).toHaveProperty('name', 'Test Country');
  });

  it('/countriescqrs/:id (PUT) should update a country', async () => {
    const updatedName = 'Updated Country Name';
    const response = await request(app.getHttpServer())
      .put(`/countriescqrs/${createdCountry.id}`)
      .send({ name: updatedName })
      .expect(200);

    expect(response.body).toHaveProperty('id', createdCountry.id);
    expect(response.body.name).toBe(updatedName);
  });

  it('/countriescqrs/:id (DELETE) should delete a country', async () => {
    await request(app.getHttpServer())
      .delete(`/countriescqrs/${createdCountry.id}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/countriescqrs/${createdCountry.id}`)
      .expect(404);
  });
});
