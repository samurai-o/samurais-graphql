import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Gqlresponse = createParamDecorator((data, ctx) => {
  return GqlExecutionContext.create(ctx).getContext().res;
});
