import { AuthorizationService } from '@app/authorization/authorization.service';
import { GqlContext } from '@app/decorators';
import { PrismastoreService } from '@app/prismastore';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { AccountCreate } from '../inputs';
import { Account } from '../objectType';

@Resolver(Account)
export class AccountResolver {
  constructor(private readonly auth: AuthorizationService) {}

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
    (req.session as any).accountId = account.id;
    req.session.save();
    const token = await this.auth.token({
      accountID: account.id,
      userID: account.userId,
      email: account.email,
    });
    req.res.setHeader('Authorization', token);
    return account;
  }
}
