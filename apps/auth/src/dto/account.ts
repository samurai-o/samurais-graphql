import { IsEmail, IsString } from 'class-validator';
import { IAccount } from '../interfaces';

export class AccountDto implements IAccount {
  @IsEmail({}, { message: '请输入正确的邮箱' })
  email: string;

  @IsString({ message: '请输入密码' })
  password: string;
}
