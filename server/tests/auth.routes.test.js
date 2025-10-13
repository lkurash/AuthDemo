import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { app } from './setup.js';
import { getCsrf } from './helpers/getCsrf.js';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

describe('Auth routes', () => {
  it('register -> login -> logout flow', async () => {
    const agent = request.agent(app);
    const csrf = await getCsrf(agent);

    const reg = await agent
      .post('/api/auth/register')
      .set('X-XSRF-TOKEN', csrf)
      .set('Accept', 'application/json')
      .send({ username: 'Alice', email: 'alice@example.com', password: 'pass123' });
    expect(reg.status).toBe(201);
    expect(reg.body.email).toBe('alice@example.com');

    const login = await agent
      .post('/api/auth/login')
      .set('X-XSRF-TOKEN', csrf)
      .set('Accept', 'application/json')
      .send({ email: 'alice@example.com', password: 'pass123' });
    expect(login.status).toBe(200);
    expect(login.body.email).toBe('alice@example.com');

    const logout = await agent
      .post('/api/auth/logout')
      .set('X-XSRF-TOKEN', csrf)
      .set('Accept', 'application/json')
      .send({});
    expect(logout.status).toBe(200);
  });

  it('login fails with wrong password', async () => {
    const agent = request.agent(app);
    const csrf = await getCsrf(agent);

    const passwordHash = await bcrypt.hash('pass123', 10);
    await User.create({ username: 'Bob', email: 'bob@example.com', passwordHash });

    const res = await agent
      .post('/api/auth/login')
      .set('X-XSRF-TOKEN', csrf)
      .set('Accept', 'application/json')
      .send({ email: 'bob@example.com', password: 'wrong' });

    expect(res.status).toBe(400);
  });
});
