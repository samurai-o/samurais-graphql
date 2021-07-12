import { Field, ObjectType } from '@nestjs/graphql';
import { Organization } from './organization';

@ObjectType({ description: '账号信息' })
export class Account {
  @Field({ nullable: true, description: '账号id' })
  id?: string;

  @Field({ nullable: true, description: '邮箱' })
  email: string;

  @Field({ nullable: true, description: '创建日期' })
  createAt: Date;

  @Field({ nullable: true, description: '更新日期' })
  updateAt: Date;

  @Field({ nullable: true, description: '用户id' })
  userId: string;

  @Field(() => [Organization], {
    nullable: true,
    description: '所在组织列表',
    defaultValue: [],
  })
  organazitions: Organization[];
}
