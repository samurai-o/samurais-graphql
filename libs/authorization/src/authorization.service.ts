import { Injectable, Global } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IToken } from './interfaces';

@Global()
@Injectable()
export class AuthorizationService {
  constructor(private readonly jwt: JwtService) {}

  async token(data: IToken) {
    return `bearer  ${this.jwt.sign(JSON.stringify(data))}`;
  }
}
