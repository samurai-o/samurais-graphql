import { Field, ObjectType } from '@nestjs/graphql';
import { user } from '@prisma/client';

@ObjectType({ description: '用户基础信息' })
export class User implements user {
  @Field({ nullable: true, description: '用户id' })
  id: string;

  @Field({ nullable: true, description: '账号id' })
  accountID: string;

  @Field({ nullable: true, description: '描述' })
  info: string;
}
