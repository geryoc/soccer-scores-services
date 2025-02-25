/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { closeTestApp, setupTestApp } from '../shared/test-setup';

describe('TeamsController (e2e)', () => {
  let app: INestApplication;
  let createdTeam: any;

  beforeAll(async () => {
    app = await setupTestApp();
  });

  afterAll(async () => {
    await closeTestApp(app);
  });

  it('/teams (POST) should create a team', async () => {
    const response = await request(app.getHttpServer())
      .post('/teams')
      .send({ name: 'Test Team' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test Team');
    createdTeam = response.body;
  });

  it('/teams (GET) should get all teams', async () => {
    const response = await request(app.getHttpServer())
      .get('/teams')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('/teams/:id (GET) should get team by id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/teams/${createdTeam.id}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdTeam.id);
    expect(response.body.name).toBe(createdTeam.name);
  });

  it('/teams/:id (PUT) should update a team', async () => {
    const updatedData = { name: 'Updated Team' };
    const response = await request(app.getHttpServer())
      .put(`/teams/${createdTeam.id}`)
      .send(updatedData)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdTeam.id);
    expect(response.body.name).toBe(updatedData.name);
  });

  it('/teams/:id (DELETE) should delete a team', async () => {
    await request(app.getHttpServer())
      .delete(`/teams/${createdTeam.id}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/teams/${createdTeam.id}`)
      .expect(404);
  });
});
