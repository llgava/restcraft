import request from 'supertest';
import Server from '../src/server';
import { MongoManager } from '../src/utils/MongoManager';

import { IBlock } from '../src/typings/IBlocks';

afterAll(async () => {
  await MongoManager.close(true);
});

describe('Blocks Controller', () => {
  const block: IBlock = {
    id: 'minecraft:custom',
    name: "Custom Block",
    has_variations: true,
    texture_data: "custom_block",
    metadata: [
      {
        data: 0,
        name: "Custom Block 1"
      },
      {
        data: 1,
        name: "Custom Block 2"
      }
    ]
  }

  describe('create method', () => {
    it('should create a new Minecraft Block', async () => {
      const res = await request(Server.app)
        .post('/api/blocks')
        .send(block);

      expect(res.body.error).toBe(false);
    });

    it('should not create the same Minecraft Block previously', async () => {
      const res = await request(Server.app)
        .post('/api/blocks')
        .send(block);

      expect(res.body.error).toBe(true);
    });
  })

  it('should list all Minecraft Blocks', async () => {
    const res = await request(Server.app)
      .get('/api/blocks');

    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should list a Minecraft Block by id', async () => {
    const res = await request(Server.app)
      .get('/api/blocks/id?value=' + block.id);

    expect(res.body.id).toBe(block.id);
  });

  describe('getByName method', () => {
    it('should list a Minecraft Block by name', async () => {
      const res = await request(Server.app)
        .get('/api/blocks/name?value=' + block.name);

      expect(res.body.id).toBe(block.id);
    });

    it('should list a Minecraft Block by a metadata name', async () => {
      const res = await request(Server.app)
        .get('/api/blocks/name?value=' + block.metadata[1].name);

      expect(res.body.id).toBe(block.id);
    });
  });

  describe('getMetadataById method', () => {
    it('should list a Minecraft Block Metadata by id', async () => {
      const res = await request(Server.app)
        .get('/api/blocks/metadata?from=' + block.id);

      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should not list any Minecraft Block Metadata', async () => {
      const res = await request(Server.app)
        .get('/api/blocks/metadata?from=minecraft:air');

      expect(res.body.error).toBe(true);
    });
  })

  describe('delete method', () => {
    it('should delete the Minecraft Block created on first test', async () => {
      const res = await request(Server.app)
        .delete('/api/blocks?value=' + block.id);

      expect(res.body.error).toBe(false);
    });

    it('should not delete any Minecraft Block', async () => {
      const res = await request(Server.app)
        .delete('/api/blocks?value=' + block.id);

      expect(res.body.error).toBe(true);
    });
  });
});
