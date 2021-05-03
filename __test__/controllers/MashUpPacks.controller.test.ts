require('dotenv').config();
import request from 'supertest';
import Server from '../../src/server';
import { CatalogRating, CatalogModel } from '../../src/models/Catalog.model';
import { v4 } from 'uuid';

const api = `${Server.url}/mash-up-packs`;

afterAll(async () => { await Server.mongoDB.close(true); });

describe('MashUpPacks.controller', () => {
  const mashUpPack: CatalogModel = {
    uuid: v4(),
    title: 'Toy Story Mash-up',
    description: 'Open up the toy box! Woody, Buzz, Bo Peep and many of your favorite toys come to life in this oversized Mash-up based on all the Toy Story movies! To infinity and beyond!',
    creator: 'Minecraft',
    price: '1340',
    trailer: 'https://www.youtube.com/watch?v=EyA_F0lX5DQ',
    keyart: 'https://xforgeassets001.xboxlive.com/pf-title-b63a0803d3653643-20ca2/a31a5fb2-e4a7-4446-801a-0f3e0069439f/ToyStory_Thumbnail_0.jpg',
    rating: {
      average: 4.5,
      total: 45000
    },
    url: 'https://www.minecraft.net/en-us/pdp.html?id=5a56435d-689c-46aa-a685-073750bff4d4'
  };

  test('should create a new mash-up pack', async (done) => {
    const response = await request(Server.app)
      .post(api).set({ Authorization: `Bearer ${process.env.BEARER_TOKEN}` }).send(mashUpPack);

    expect([201, 400]).toContain(response.status);
    done();
  });

  test('should update a mash-up pack by UUID', async (done) => {
    const updatedData: CatalogRating = { average: 5, total: 50000 };
    const response = await request(Server.app)
      .put(`${api}/update/${mashUpPack.uuid}`).set({ Authorization: `Bearer ${process.env.BEARER_TOKEN}` }).send({ rating: updatedData });

    expect([200, 400]).toContain(response.status);
    expect(response.body.rating).toMatchObject<CatalogRating>(updatedData);
    done();
  });

  test('should list all mash-up packs', async (done) => {
    const response = await request(Server.app).get(api);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should list a mash-up pack by UUID', async (done) => {
    const response = await request(Server.app).get(`${api}/uuid/${mashUpPack.uuid}`);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should list a mash-up pack by title', async (done) => {
    const response = await request(Server.app).get(`${api}/title/${mashUpPack.title}`);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should list all mash-up packs by a creator', async (done) => {
    const response = await request(Server.app).get(`${api}/creator/${mashUpPack.creator}`);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should delete a mash-up pack by UUID', async (done) => {
    const response = await request(Server.app)
      .delete(`${api}/delete/${mashUpPack.uuid}`).set({ Authorization: `Bearer ${process.env.BEARER_TOKEN}` });

    expect([200, 400]).toContain(response.status);
    done();
  });
});
