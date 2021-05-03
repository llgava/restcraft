require('dotenv').config();
import request from 'supertest';
import Server from '../../src/server';
import { CatalogRating, CatalogModel } from '../../src/models/Catalog.model';
import { v4 } from 'uuid';

const api = `${Server.url}/skin-packs`;

afterAll(async () => { await Server.mongoDB.close(true); });

describe('SkinPacks.controller', () => {
  const skinPack: CatalogModel = {
    uuid: v4(),
    title: 'Builders & Biomes',
    description: 'Live off the land and enjoy the simple life with these farm-tastic skins! To celebrate the release of the new Minecraft Builders & Biomes: Farmer\u2019s Market board game expansion, we are bringing you this fun skin pack to add some style to your homestead! Whether you aspire to be a skilled gardener or a busy builder, now you can look the part!',
    creator: 'Minecraft',
    price: '0',
    trailer: null,
    keyart: 'https://xforgeassets001.xboxlive.com/pf-title-b63a0803d3653643-20ca2/1134a79a-7c38-4083-94c8-ca1fdf7452f3/thumbnail_0.jpg',
    rating: {
      average: 4.5,
      total: 45000
    },
    url: 'https://www.minecraft.net/en-us/pdp.html?id=d8d8c1ea-ecd8-4b9b-bd7b-91943a63bb3f'
  };

  test('should create a new skin pack', async (done) => {
    const response = await request(Server.app)
      .post(api).set({ Authorization: `Bearer ${process.env.BEARER_TOKEN}` }).send(skinPack);

    expect([201, 400]).toContain(response.status);
    done();
  });

  test('should update a skin pack by UUID', async (done) => {
    const updatedData: CatalogRating = { average: 5, total: 50000 };
    const response = await request(Server.app)
      .put(`${api}/update/${skinPack.uuid}`).set({ Authorization: `Bearer ${process.env.BEARER_TOKEN}` }).send({ rating: updatedData });

    expect([200, 400]).toContain(response.status);
    expect(response.body.rating).toMatchObject<CatalogRating>(updatedData);
    done();
  });

  test('should list all skin packs', async (done) => {
    const response = await request(Server.app).get(api);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should list a skin pack by UUID', async (done) => {
    const response = await request(Server.app).get(`${api}/uuid/${skinPack.uuid}`);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should list a skin pack by title', async (done) => {
    const response = await request(Server.app).get(`${api}/title/${skinPack.title}`);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should list all skin packs by a creator', async (done) => {
    const response = await request(Server.app).get(`${api}/creator/${skinPack.creator}`);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should delete a skin pack by UUID', async (done) => {
    const response = await request(Server.app)
      .delete(`${api}/delete/${skinPack.uuid}`).set({ Authorization: `Bearer ${process.env.BEARER_TOKEN}` });

    expect([200, 400]).toContain(response.status);
    done();
  });
});
