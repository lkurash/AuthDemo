import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { app } from './setup.js';
import { getCsrf } from './helpers/getCsrf.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

describe('Users routes', () => {
  it('GET /api/users/me returns current user', async () => {
    const agent = request.agent(app);
    const csrf = await getCsrf(agent);

    const me = await User.create({
      username: 'Jane',
      email: 'jane@example.com',
      passwordHash: 'hash',
    });
    const token = jwt.sign({ sub: String(me._id), email: me.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '30m',
    });

    const res = await agent
      .get('/api/users/me')
      .set('X-XSRF-TOKEN', csrf)
      .set('Cookie', `accessToken=${token}`)
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.email).toBe('jane@example.com');
  });

  it('GET /api/users/me returns 401 without token', async () => {
    const agent = request.agent(app);
    const csrf = await getCsrf(agent);

    const res = await agent.get('/api/users/me').set('X-XSRF-TOKEN', csrf);
    expect(res.status).toBe(401);
  });
});
