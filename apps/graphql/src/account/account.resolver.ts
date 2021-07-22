import { AuthorizationService } from '@app/authorization/authorization.service';
import { GqlContext } from '@app/decorators';
import { PrismastoreService } from '@app/prismastore';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';
import { Request } from 'express';
import { AccountCreate } from '../inputs';
import { Account } from '../objectType';
import { AccountLogin } from '../querys';

@Resolver(Account)
export class AccountResolver {
  constructor(private readonly auth: AuthorizationService) {}

  @Query(() => Account, { name: 'login', description: '账号登录' })
  async login(
    @GqlContext('prisma') prisma: PrismastoreService,
    @GqlContext('req') req: Request,
    @Args({ type: () => AccountLogin }) query: AccountLogin,
  ) {
    const account = await prisma.account.findFirst({
      where: { email: query.email, password: query.password },
      select: {
        email: true,
        id: true,
        createAt: true,
        updateAt: true,
        userId: true,
      },
    });
    if (!account) return new AuthenticationError('账号密码错误');
    if (query.remember) {
      (req.session as any).accountId = account.id;
      req.session.save();
    }
    const token = await this.auth.token({
      accountID: account.id,
      userID: account.userId,
      email: account.email,
    });
    req.res.setHeader('Authorization', token);
    return account;
  }

  @Mutation(() => Account, { name: 'register' })
  async create(
    @GqlContext('prisma') prisma: PrismastoreService,
    @Args({ name: 'input', type: () => AccountCreate }) input: AccountCreate,
    @GqlContext('req') req: Request,
  ) {
    const account = await prisma.account.create({
      data: {
        email: input.email,
        password: input.password,
        user: {
          create: {
            info: '',
          },
        },
      },
      select: {
        email: true,
        id: true,
        createAt: true,
        updateAt: true,
        userId: true,
      },
    });
    if (input.remember) {
      (req.session as any).accountId = account.id;
      req.session.save();
    }
    const token = await this.auth.token({
      accountID: account.id,
      userID: account.userId,
      email: account.email,
    });
    req.res.setHeader('Authorization', token);
    return account;
  }
}
