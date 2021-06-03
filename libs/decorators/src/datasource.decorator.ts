import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const DataSourceContext = createParamDecorator((data, ctx) => {
  return GqlExecutionContext.create(ctx).getContext().dataSources;
});
