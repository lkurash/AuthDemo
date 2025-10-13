import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { app } from '../setup.js';
import { getCsrf } from '../helpers/getCsrf.js';
import User from '../../models/user.js';

describe('Auth flow (additional)', () => {
  it('register returns 409 for existing email', async () => {
    const agent = request.agent(app);
    const csrf = await getCsrf(agent);

    await User.create({ username: 'Same', email: 'same@example.com', passwordHash: 'h' });

    const res = await agent
      .post('/api/auth/register')
      .set('X-XSRF-TOKEN', csrf)
      .set('Accept', 'application/json')
      .send({ username: 'Same', email: 'same@example.com', password: 'pass123' });

    expect(res.status).toBe(409);
  });

  it('GET /api/users/me with invalid token returns 401', async () => {
    const agent = request.agent(app);
    const csrf = await getCsrf(agent);

    const res = await agent
      .get('/api/users/me')
      .set('X-XSRF-TOKEN', csrf)
      .set('Cookie', `accessToken=invalidtoken`)
      .set('Accept', 'application/json');

    expect(res.status).toBe(401);
  });
});
