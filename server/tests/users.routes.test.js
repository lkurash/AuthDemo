import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { app } from './setup.js';
import { signToken } from '../helpers/auth.js';
import User from '../models/user.js';

async function getCsrf(agent) {
  const res = await agent.get('/api/auth/login');
  const cookies = res.headers['set-cookie'] || [];
  const raw = cookies.find((c) => c.startsWith('XSRF-TOKEN=')) || '';
  const token = raw.split('XSRF-TOKEN=')[1]?.split(';')[0];
  return token || '';
}

describe('Users routes', () => {
  it('GET /api/users/me returns current user', async () => {
    const agent = request.agent(app);
    const csrf = await getCsrf(agent);

    const me = await User.create({
      username: 'Jane',
      email: 'jane@example.com',
      passwordHash: 'hash',
    });
    const token = signToken(me);

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
