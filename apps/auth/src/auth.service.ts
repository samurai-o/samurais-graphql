import { ApiException } from '@app/exceptions';
import { PrismastoreService } from '@app/prismastore';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountDto } from './dto';
import { IAccount } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismastoreService,
    private readonly jwt: JwtService,
  ) {}

  async login(data: AccountDto) {
    const { email, password } = data;
    const account = await this.prisma.account.findFirst({
      where: { email, password },
    });
    if (!account) throw new Error('登录异常');
    return account;
  }

  async register(data: AccountDto) {
    const { email, password } = data;
    let account = await this.prisma.account.findFirst({ where: { email } });
    if (account) throw new ApiException('账号重名', 999, 200);
    account = await this.prisma.account.create({
      data: {
        email,
        password,
        user: {
          create: { info: '' },
        },
      },
    });
    if (!account) throw new Error('创建失败');
    return account;
  }

  async findIdToAccount(id: string) {
    return await this.prisma.account.findFirst({ where: { id } });
  }

  async token(data: IAccount) {
    return `bearer  ${this.jwt.sign(
      JSON.stringify({ id: data.id, email: data.email }),
    )}`;
  }

  /**
   * 查询登录地址
   * @returns
   */
  async queryLoginAuth() {
    return '/user/login';
  }
}
