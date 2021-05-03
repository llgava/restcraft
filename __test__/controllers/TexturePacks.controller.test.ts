require('dotenv').config();
import request from 'supertest';
import Server from '../../src/server';
import { CatalogRating, CatalogModel } from '../../src/models/Catalog.model';
import { v4 } from 'uuid';

const api = `${Server.url}/texture-packs`;

afterAll(async () => { await Server.mongoDB.close(true); });

describe('TexturePacks.controller', () => {
  const texturePack: CatalogModel = {
    uuid: v4(),
    title: 'Minecraft Classic Texture Pack',
    description: 'The classic Minecraft look you know and love! We recently updated the game with new and stylish textures, but if you prefer more of a retro flavor to your Minecraft, this is the pack for you! Why not try both packs and compare them yourself?',
    creator: 'Minecraft',
    price: '0',
    trailer: null,
    keyart: 'https://xforgeassets002.xboxlive.com/serviceid-18231953-4b1d-472c-a39e-48b10105b7b7-public/eed0caf1-ee40-4afd-b07d-7b88ef44cfbc/ClassicTextures_thumbnail_0.jpg',
    rating: {
      average: 4.5,
      total: 45000
    },
    url: 'https://www.minecraft.net/en-us/pdp.html?id=58d525a7-f93d-41a6-b1f3-c7887e2dad3d'
  };

  test('should create a new texture pack', async (done) => {
    const response = await request(Server.app)
      .post(api).set({ Authorization: `Bearer ${process.env.BEARER_TOKEN}` }).send(texturePack);

    expect([201, 400]).toContain(response.status);
    done();
  });

  test('should update a texture pack by UUID', async (done) => {
    const updatedData: CatalogRating = { average: 5, total: 50000 };
    const response = await request(Server.app)
      .put(`${api}/update/${texturePack.uuid}`).set({ Authorization: `Bearer ${process.env.BEARER_TOKEN}` }).send({ rating: updatedData });

    expect([200, 400]).toContain(response.status);
    expect(response.body.rating).toMatchObject<CatalogRating>(updatedData);
    done();
  });

  test('should list all texture packs', async (done) => {
    const response = await request(Server.app).get(api);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should list a texture pack by UUID', async (done) => {
    const response = await request(Server.app).get(`${api}/uuid/${texturePack.uuid}`);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should list a texture pack by title', async (done) => {
    const response = await request(Server.app).get(`${api}/title/${texturePack.title}`);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should list all texture packs by a creator', async (done) => {
    const response = await request(Server.app).get(`${api}/creator/${texturePack.creator}`);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should delete a texture pack by UUID', async (done) => {
    const response = await request(Server.app)
      .delete(`${api}/delete/${texturePack.uuid}`).set({ Authorization: `Bearer ${process.env.BEARER_TOKEN}` });

    expect([200, 400]).toContain(response.status);
    done();
  });
});
