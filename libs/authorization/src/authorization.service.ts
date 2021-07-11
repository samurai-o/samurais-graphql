import { Injectable, Global } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAccount } from './interfaces';

@Global()
@Injectable()
export class AuthorizationService {
  constructor(private readonly jwt: JwtService) {}

  async token(data: IAccount) {
    return `bearer  ${this.jwt.sign(
      JSON.stringify({ id: data.id, email: data.email }),
    )}`;
  }
}
