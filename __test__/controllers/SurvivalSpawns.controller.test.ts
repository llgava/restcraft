require('dotenv').config();
import request from 'supertest';
import Server from '../../src/server';
import { CatalogRating, CatalogModel } from '../../src/models/Catalog.model';
import { v4 } from 'uuid';

const api = `${Server.url}/survival-spawns`;

afterAll(async () => { await Server.mongoDB.close(true); });

describe('SurvivalSpawns.controller', () => {
  const survialSpawn: CatalogModel = {
    uuid: v4(),
    title: 'The Nightmare Before Christmas',
    description: 'A nightmare? Before Christmas?\r\nWith thousands of blocks over there\r\nAnd more redstone than I can bear?\r\nLooks scary, but also fun!\r\nCould it be I got my wish?\r\nShould I play, or should I run?\r\nA Christmas pack so nightmarish!',
    creator: 'Minecraft',
    price: '990',
    trailer: null,
    keyart: 'https://xforgeassets001.xboxlive.com/pf-title-b63a0803d3653643-20ca2/4229c46f-929c-43fa-a9dc-2be9e1bc43c0/NightmareBeforeChristmas_thumbnail_800x450.jpg',
    rating: {
      average: 4.5,
      total: 45000
    },
    url: 'https://www.minecraft.net/en-us/pdp.html?id=fb104838-8501-4325-866a-afb0ce5fc605'
  };

  test('should create a new survival spawn', async (done) => {
    const response = await request(Server.app)
      .post(api).set({ Authorization: `Bearer ${process.env.BEARER_TOKEN}` }).send(survialSpawn);

    expect([201, 400]).toContain(response.status);
    done();
  });

  test('should update a survival spawn by UUID', async (done) => {
    const updatedData: CatalogRating = { average: 5, total: 50000 };
    const response = await request(Server.app)
      .put(`${api}/update/${survialSpawn.uuid}`).set({ Authorization: `Bearer ${process.env.BEARER_TOKEN}` }).send({ rating: updatedData });

    expect([200, 400]).toContain(response.status);
    expect(response.body.rating).toMatchObject<CatalogRating>(updatedData);
    done();
  });

  test('should list all survival spawns', async (done) => {
    const response = await request(Server.app).get(api);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should list a survival spawn by UUID', async (done) => {
    const response = await request(Server.app).get(`${api}/uuid/${survialSpawn.uuid}`);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should list a survival spawn by title', async (done) => {
    const response = await request(Server.app).get(`${api}/title/${survialSpawn.title}`);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should list all survival spawns by a creator', async (done) => {
    const response = await request(Server.app).get(`${api}/creator/${survialSpawn.creator}`);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should delete a survival spawn by UUID', async (done) => {
    const response = await request(Server.app)
      .delete(`${api}/delete/${survialSpawn.uuid}`).set({ Authorization: `Bearer ${process.env.BEARER_TOKEN}` });

    expect([200, 400]).toContain(response.status);
    done();
  });
});
