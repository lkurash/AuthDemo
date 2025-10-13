import { describe, it, expect, beforeEach } from 'vitest';
import UserService from '../../services/userService.js';
import User from '../../models/user.js';

describe('UserService (unit-ish)', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('register returns isSuccess and token when email is new', async () => {
    const userService = new UserService();
    const res = await userService.register({
      username: 'A',
      email: 'a@example.com',
      password: 'pass123',
    });
    expect(res.isSuccess).toBe(true);
    expect(res.token).toBeDefined();
    expect(res.user.email).toBe('a@example.com');
  });

  it('register returns isError when email already in use', async () => {
    await User.create({ username: 'X', email: 'x@example.com', passwordHash: 'h' });
    const userService = new UserService();
    const res = await userService.register({
      username: 'X',
      email: 'x@example.com',
      password: 'pass',
    });
    expect(res.isError).toBe(true);
    expect(res.error).toBeDefined();
  });
});
