import { Injectable } from '@nestjs/common';
import { DataSource } from 'apollo-datasource';
import { GraphQLError } from 'graphql';
import { PrismastoreService } from 'libs/prismastore/src';
import { IAccount } from './interfaces';

@Injectable()
export class UserAPI extends DataSource {
  constructor(private readonly prisma: PrismastoreService) {
    super();
  }

  async createAccount(params: IAccount) {
    try {
      const { email, password } = params;
      return this.prisma.account.create({ data: { email, password } });
    } catch (error) {
      throw new GraphQLError('账号创建失败');
    }
  }

  async getUser() {
    return this.prisma.user.count();
  }
}
