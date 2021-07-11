import { Field, ObjectType } from '@nestjs/graphql';
import { organazition } from '@prisma/client';
import { User } from './user';

@ObjectType({ description: '组织信息' })
export class Organization implements Partial<organazition> {
  @Field({ nullable: true, description: '组织id' })
  id: string;

  @Field({ nullable: true, description: '组织名' })
  name: string;

  @Field({ nullable: true, description: '组织描述' })
  describe: string;

  @Field(() => [User], {
    nullable: true,
    description: '成员列表',
    defaultValue: [],
  })
  personnels: User[];
}
