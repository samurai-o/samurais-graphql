import { IAccount } from '@app/authorization/interfaces';
import { GqlContext, Gqlresponse, Gqltoken } from '@app/decorators';
import { PrismastoreService } from '@app/prismastore';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { GqlAuthGuard } from '../gql-auth.guard';
import { OrganizationCreate } from '../inputs';
import { Organization } from '../objectType/organization';
import { User } from '../objectType/user';

@Resolver(Organization)
export class OrganizationResolver {
  @Mutation(() => Organization)
  @UseGuards(GqlAuthGuard)
  async create(
    @Args({ name: 'input', type: () => OrganizationCreate })
    input: OrganizationCreate,
    @GqlContext('prisma')
    prisma: PrismastoreService,
    @Gqltoken() token: IAccount,
  ) {
    return prisma.organazition.create({
      data: {
        name: input.name,
        describe: input.describe,
        personnels: {
          create: { accountId: token.id },
        },
      },
    });
  }

  @Query(() => Organization)
  @UseGuards(GqlAuthGuard)
  organization(
    @Gqltoken()
    token: IAccount,
    @GqlContext('prisma')
    prisma: PrismastoreService,
  ) {
    return prisma.personnel
      .findFirst({
        where: { accountId: token.id },
        select: {
          organazition: {
            select: {
              id: true,
              name: true,
              describe: true,
            },
          },
        },
      })
      .then((res) => res.organazition);
  }

  @ResolveProperty(() => [User])
  async personnels(
    @Parent() organization: Organization,
    @GqlContext('prisma') prisma: PrismastoreService,
  ) {
    if (!organization || !organization.id) return [];
    const data = await prisma.personnel.findMany({
      where: { organazitionId: organization.id },
      select: {
        account: {
          select: {
            user: {
              select: {
                id: true,
                info: true,
              },
            },
          },
        },
      },
    });
    console.log(data);
    return [];
  }
}
