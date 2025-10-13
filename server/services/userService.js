import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';
import {
  AuthenticatedError,
  EmailInUseError,
  InvalidCredentialsError,
  UserNotFoundError,
} from './errors.js';

export default class UserService {
  constructor(deps = {}) {
    this.UserModel = deps.UserModel || UserModel;
  }

  async login({ email, password }) {
    const user = await this.UserModel.findOne({ email }).lean();
    if (!user) return { isError: true, error: new UserNotFoundError() };

    const match = await this.passwordCompare(password, user.passwordHash);
    if (!match) return { isError: true, error: new InvalidCredentialsError() };

    const token = this.createToken(user);
    return { isSuccess: true, token, user: { id: String(user._id), email: user.email } };
  }

  async register({ username, email, password }) {
    const existing = await this.UserModel.findOne({ email }).lean();
    if (existing) return { isError: true, error: new EmailInUseError() };

    const user = await this.createUser({ username, email, password });
    const token = this.createToken(user);

    return { isSuccess: true, token, user: { id: String(user._id), email: user.email } };
  }

  async createUser({ username, email, password }) {
    const passwordHash = await this.hashPassword(password, 10);
    const user = await this.UserModel.create({ username, email, passwordHash });
    return user;
  }

  async getUserById(userId) {
    if (!userId) return { isError: true, error: new AuthenticatedError() };
    const user = await this.UserModel.findById(userId).lean();
    if (!user) return { isError: true, error: new UserNotFoundError() };
    return { isSuccess: true, user };
  }

  async passwordCompare(password, hash) {
    return bcrypt.compare(password, hash);
  }

  async hashPassword(password, saltRounds = 10) {
    return bcrypt.hash(password, saltRounds);
  }

  createToken(user) {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('Missing JWT_SECRET environment variable');

    const expiresIn = process.env.JWT_EXPIRES_IN || '30m';
    return jwt.sign({ sub: String(user._id), email: user.email }, secret, { expiresIn });
  }
}
