import { AuthorizationService } from '@app/authorization/authorization.service';
import { IToken } from '@app/authorization/interfaces';
import { GqlContext, Gqltoken } from '@app/decorators';
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
  constructor(private readonly auth: AuthorizationService) {}

  @Mutation(() => Organization)
  @UseGuards(GqlAuthGuard)
  async create(
    @Args({ name: 'input', type: () => OrganizationCreate })
    input: OrganizationCreate,
    @GqlContext('prisma')
    prisma: PrismastoreService,
    @Gqltoken() token: IToken,
  ) {
    return prisma.organazition.create({
      data: {
        name: input.name,
        describe: input.describe,
        personnel: {
          create: { userId: token.userID },
        },
      },
    });
  }

  @Query(() => Organization)
  @UseGuards(GqlAuthGuard)
  organization(
    @Gqltoken()
    token: IToken,
    @GqlContext('prisma')
    prisma: PrismastoreService,
  ) {
    return prisma.personnel
      .findFirst({
        where: { userId: token.userID },
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
    return await prisma.personnel
      .findMany({
        where: { organazitionId: organization.id },
        select: {
          user: {
            select: {
              id: true,
              info: true,
            },
          },
        },
      })
      .then((res) => res.map((r) => r.user));
  }
}
