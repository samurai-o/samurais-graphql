import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: '账号创建' })
export class AccountCreate {
  @Field({ nullable: true, description: '账号id' })
  id?: string;
  @Field({ description: '邮箱' })
  email: string;
  @Field({ description: '密码' })
  password: string;
  @Field({ nullable: true, description: '是否记住密码', defaultValue: 0 })
  remember?: number;
}
