import { Field, InputType } from '@nestjs/graphql';
import { IAccount } from '../interfaces';

@InputType()
export class CreateAccountInput implements IAccount {
  @Field()
  email: string;

  @Field()
  password: string;
}
