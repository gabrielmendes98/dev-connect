import jwt from 'jsonwebtoken';
import { TokenPayload, TokenService } from '@domain/identity/services/TokenService';
import { InternalServerError } from '@domain/shared/errors/HttpErrors';
import { Logger } from '@application/shared/ports/Logger';
import type { StringValue } from 'ms';

export class JwtTokenService implements TokenService {
  private readonly secret = process.env.JWT_SECRET;
  private readonly expiresIn = process.env.JWT_EXPIRES_IN as StringValue;

  constructor(private readonly logger: Logger) {}

  generate(payload: TokenPayload): string {
    if (!this.secret || !this.expiresIn) {
      throw new InternalServerError('JWT secrets missing.');
    }
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verify(token: string): TokenPayload | null {
    if (!this.secret || !this.expiresIn) {
      throw new InternalServerError('JWT secrets missing.');
    }
    try {
      const decoded = jwt.verify(token, this.secret) as TokenPayload;
      return decoded;
    } catch (error) {
      this.logger.error('JwtTokenService: verify error:', { error });
      return null;
    }
  }
}
