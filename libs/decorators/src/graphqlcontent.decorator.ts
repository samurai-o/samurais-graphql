import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export type KEY = 'loaders' | 'prisma' | 'req' | 'res';

export const GqlContext = createParamDecorator<KEY>((data: KEY, ctx) => {
  const context = GqlExecutionContext.create(ctx).getContext();
  if (!data) return context;
  return context[data];
});
