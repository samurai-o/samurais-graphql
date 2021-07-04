import { DataSourceAPI } from '@app/datasource';
import { Gqlresponse } from '@app/decorators';
import { User } from '@app/models';
import { Context, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  @Query(() => User)
  user(@Context() context: any, @Gqlresponse() res: any) {
    context.req.session.user = 1;
    return { id: '1', res };
  }

  @Query(() => User)
  account(@Context() context: any, @Gqlresponse() res: any) {
    return { id: '1', res };
  }
}
