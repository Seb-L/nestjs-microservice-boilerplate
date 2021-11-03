import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService extends TypeOrmCrudService<Account> {
  constructor(@InjectRepository(Account) repo) {
    super(repo);
  }
}
