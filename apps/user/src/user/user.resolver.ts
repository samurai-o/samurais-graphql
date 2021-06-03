import { DataSourceAPI } from '@app/datasource';
import { CreateAccountInput } from '@app/datasource/inputs';
import { DataSourceContext, Gqlresponse } from '@app/decorators';
import { User } from '@app/models';
import { Res } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express';

@Resolver()
export class UserResolver {
  @Query(() => User)
  user(@Context() context: any, @Gqlresponse() res: any) {
    context.req.session.user = 1;
    return { id: '1' };
  }

  @Query(() => User)
  account(@Context() context: any, @Gqlresponse() res: any) {
    console.log(context.req.session.user);
    return { id: '1' };
  }
}
