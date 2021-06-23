import crypto from 'crypto'

export default class TokenGenerator {
  static generate(): string {
    return crypto.randomBytes(24).toString('hex');
  }
}