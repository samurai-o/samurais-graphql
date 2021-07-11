import { Field, InputType } from '@nestjs/graphql';
import { organazition } from '@prisma/client';

@InputType()
export class OrganizationCreate implements organazition {
  @Field({ nullable: true, description: '组织id' })
  id: string;
  @Field({ description: '组织名称' })
  name: string;
  @Field({ nullable: true, description: '组织描述' })
  describe: string;
}
