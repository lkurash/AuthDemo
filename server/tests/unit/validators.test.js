import { describe, it, expect } from 'vitest';
import { validateLoginInput, validateRegisterInput } from '../../middleware/validators.js';

function runMiddleware(middleware, req) {
  let called = false;
  const res = {
    status(code) {
      this._status = code;
      return this;
    },
    json(obj) {
      this._body = obj;
      return this;
    },
  };

  return new Promise((resolve) => {
    middleware(req, res, () => {
      called = true;
      resolve({ called, res });
    });
    resolve({ called, res });
  });
}

describe('validators middleware', () => {
  it('validateLoginInput allows valid input', async () => {
    const req = { body: { email: 'ok@mail.com', password: 'abc123' } };
    const { called, res } = await runMiddleware(validateLoginInput, req);
    expect(called).toBe(true);
    expect(res._status).toBeUndefined();
  });

  it('validateLoginInput rejects invalid email', async () => {
    const req = { body: { email: 'bad', password: 'abc123' } };
    const { called, res } = await runMiddleware(validateLoginInput, req);
    expect(called).toBe(false);
    expect(res._status).toBe(400);
    expect(res._body).toEqual({ message: 'Invalid email format' });
  });

  it('validateRegisterInput rejects missing username', async () => {
    const req = { body: { email: 'a@b.com', password: 'abc123', username: '' } };
    const { called, res } = await runMiddleware(validateRegisterInput, req);
    expect(called).toBe(false);
    expect(res._status).toBe(400);
    expect(res._body).toEqual({ message: 'Invalid username' });
  });
});
