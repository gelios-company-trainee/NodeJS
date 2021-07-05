import crypto from 'crypto'

export default class HashPasswordCreator {
  static create(password: string): string {
    return crypto.createHash('md5').update(password).digest('hex');
  }
}