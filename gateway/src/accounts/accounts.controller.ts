import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { AuthGuard } from '@/auth/guards/auth.guard';

import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@ApiTags('Accounts')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Crud({
  model: {
    type: Account,
  },
  dto: {
    create: CreateAccountDto,
    update: UpdateAccountDto,
    replace: UpdateAccountDto,
  },
  query: {
    join: {
      users: {
        eager: true,
      },
      apps: {
        eager: true,
      },
      webhooks: {
        eager: true,
      },
    },
  },
})
@Controller('accounts')
export class AccountsController implements CrudController<Account> {
  constructor(public service: AccountsService) {}
}
