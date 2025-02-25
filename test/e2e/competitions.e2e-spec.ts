/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { setupTestApp } from 'test/shared/test-setup';

describe('CompetitionsController (e2e)', () => {
  let app: INestApplication;
  let createdCompetition: any;

  beforeAll(async () => {
    app = await setupTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/competitions (POST) should create a competition', async () => {
    const response = await request(app.getHttpServer())
      .post('/competitions')
      .send({ name: 'Test Competition', teamIds: [], countryId: 1 })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test Competition');
    createdCompetition = response.body;
  });

  it('/competitions (GET) should get all competitions', async () => {
    const response = await request(app.getHttpServer())
      .get('/competitions')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('/competitions/:id (GET) should get competition by id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/competitions/${createdCompetition.id}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdCompetition.id);
    expect(response.body.name).toBe(createdCompetition.name);
  });

  it('/competitions/:id (PUT) should update a competition', async () => {
    const updatedData = {
      name: 'Updated Competition',
      teamIds: [1],
      countryId: 1,
    };
    const response = await request(app.getHttpServer())
      .put(`/competitions/${createdCompetition.id}`)
      .send(updatedData)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdCompetition.id);
    expect(response.body.name).toBe(updatedData.name);
  });

  it('/competitions/:id (DELETE) should delete a competition', async () => {
    await request(app.getHttpServer())
      .delete(`/competitions/${createdCompetition.id}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/competitions/${createdCompetition.id}`)
      .expect(404);
  });
});
