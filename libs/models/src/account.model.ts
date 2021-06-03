import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Account {
  @Field({ nullable: true })
  id?: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password?: string;
}
