require('dotenv').config();
import request from 'supertest';
import Server from '../../src/server';
import { CatalogRating, CatalogModel } from '../../src/models/Catalog.model';
import { v4 } from 'uuid';

const api = `${Server.url}/adventure-maps`;

afterAll(async () => { await Server.mongoDB.close(true); });

describe('AdventureMaps.controller', () => {
  const adventureMap: CatalogModel = {
    uuid: v4(),
    title: 'Frozen',
    description: 'Welcome to Arendelle, home of Anna, Elsa, Olaf and friends. Adventure past the Ice Palace and into the unknown in this Frozen themed world! Play mini-games and complete puzzles to earn rewards, then head back to decorate the castle, all while enjoying your favorite Frozen songs! - Created by Noxcrew 1GB+ RAM Recommended',
    creator: 'Minecraft',
    price: '1340',
    trailer: 'https://www.youtube.com/watch?v=yY7R33PtatA',
    keyart: 'https://xforgeassets002.xboxlive.com/pf-title-b63a0803d3653643-ee7b/9343daf3-d9f3-42f2-aab1-8ad5838dc2e6/Frozen_Thumbnail_0.jpg',
    rating: {
      average: 4.5,
      total: 45000
    },
    url: 'https://www.minecraft.net/en-us/pdp.html?id=8f6b2d03-b0c9-4cd5-94bb-bd95ee04f012'
  };

  test('should create a new adventure map', async (done) => {
    const response = await request(Server.app)
      .post(api).set({ Authorization: `Bearer ${process.env.BEARER_TOKEN}` }).send(adventureMap);

    expect([201, 400]).toContain(response.status);
    done();
  });

  test('should update a adventure map by UUID', async (done) => {
    const updatedData: CatalogRating = { average: 5, total: 50000 };
    const response = await request(Server.app)
      .put(`${api}/update/${adventureMap.uuid}`).set({ Authorization: `Bearer ${process.env.BEARER_TOKEN}` }).send({ rating: updatedData });

    expect([200, 400]).toContain(response.status);
    expect(response.body.rating).toMatchObject<CatalogRating>(updatedData);
    done();
  });

  test('should list all adventure maps', async (done) => {
    const response = await request(Server.app).get(api);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should list a adventure map by UUID', async (done) => {
    const response = await request(Server.app).get(`${api}/uuid/${adventureMap.uuid}`);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should list a adventure map by title', async (done) => {
    const response = await request(Server.app).get(`${api}/title/${adventureMap.title}`);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should list all adventure maps by a creator', async (done) => {
    const response = await request(Server.app).get(`${api}/creator/${adventureMap.creator}`);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should delete a adventure map by UUID', async (done) => {
    const response = await request(Server.app)
      .delete(`${api}/delete/${adventureMap.uuid}`).set({ Authorization: `Bearer ${process.env.BEARER_TOKEN}` });

    expect([200, 400]).toContain(response.status);
    done();
  });
});
