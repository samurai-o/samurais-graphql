import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismastoreService } from '@app/prismastore';
import { JWT_SECRETORKEY } from '@app/configuration';
import { IToken } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly service: PrismastoreService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRETORKEY,
    });
  }

  async validate(payload: IToken) {
    const { userID, accountID } = payload;
    const account = await this.service.account.findFirst({
      where: { id: accountID, userId: userID },
      select: {
        id: true,
        createAt: true,
        email: true,
        updateAt: true,
      },
    });
    return account;
  }
}
