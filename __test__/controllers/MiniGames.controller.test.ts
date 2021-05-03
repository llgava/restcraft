require('dotenv').config();
import request from 'supertest';
import Server from '../../src/server';
import { CatalogRating, CatalogModel } from '../../src/models/Catalog.model';
import { v4 } from 'uuid';

const api = `${Server.url}/adventure-maps`;

afterAll(async () => { await Server.mongoDB.close(true); });

describe('MiniGames.controller', () => {
  const miniGame: CatalogModel = {
    uuid: v4(),
    title: 'How to Build: Town',
    description: 'Utilize 20 different build sets to create your very own custom city or town! Learn to build various different structures with extensive instruction kits and 3D models. Start with a blank canvas to create your town.\r\n+20 buildings to create\r\n+Block-by-block building guides\r\n+Includes detailed mini build models',
    creator: 'Cyclone',
    price: '830',
    trailer: 'https://www.youtube.com/watch?v=IwGpav_GeDk',
    keyart: 'https://xforgeassets001.xboxlive.com/pf-title-b63a0803d3653643-20ca2/e57b6401-3800-4197-ac47-17ba7c37fc6c/How_To_Build_thumbnail.jpg',
    rating: {
      average: 4.5,
      total: 45000
    },
    url: 'https://www.minecraft.net/en-us/pdp.html?id=2384db70-d40a-48f9-ab92-925e440e4c2d'
  };

  test('should create a new mini game', async (done) => {
    const response = await request(Server.app)
      .post(api).set({ Authorization: `Bearer ${process.env.BEARER_TOKEN}` }).send(miniGame);

    expect([201, 400]).toContain(response.status);
    done();
  });

  test('should update a mini game by UUID', async (done) => {
    const updatedData: CatalogRating = { average: 5, total: 50000 };
    const response = await request(Server.app)
      .put(`${api}/update/${miniGame.uuid}`).set({ Authorization: `Bearer ${process.env.BEARER_TOKEN}` }).send({ rating: updatedData });

    expect([200, 400]).toContain(response.status);
    expect(response.body.rating).toMatchObject<CatalogRating>(updatedData);
    done();
  });

  test('should list all mini games', async (done) => {
    const response = await request(Server.app).get(api);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should list a mini game by UUID', async (done) => {
    const response = await request(Server.app).get(`${api}/uuid/${miniGame.uuid}`);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should list a mini game by title', async (done) => {
    const response = await request(Server.app).get(`${api}/title/${miniGame.title}`);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should list all mini games by a creator', async (done) => {
    const response = await request(Server.app).get(`${api}/creator/${miniGame.creator}`);

    expect([200, 400]).toContain(response.status);
    done();
  });

  test('should delete a mini game by UUID', async (done) => {
    const response = await request(Server.app)
      .delete(`${api}/delete/${miniGame.uuid}`).set({ Authorization: `Bearer ${process.env.BEARER_TOKEN}` });

    expect([200, 400]).toContain(response.status);
    done();
  });
});
