import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: '包信息' })
export class Package {
  @Field({ nullable: true, description: '包id' })
  id: string;
  @Field({ description: '包名' })
  name: string;
  describe: string;
  createAt: Date;
  updateAt: Date;
  organazitionId: string;
}
