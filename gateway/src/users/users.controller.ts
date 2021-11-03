import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { AuthGuard } from '@/auth/guards/auth.guard';

import { UserCreateDto } from './dto/user-create.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Crud({
  model: {
    type: User,
  },
  dto: {
    create: UserCreateDto,
    update: UserCreateDto,
    replace: UserCreateDto,
  },
  query: {
    join: {
      account: {
        eager: true,
      },
      roles: {
        eager: true,
      },
      'roles.role': {
        eager: true,
      },
    },
  },
})
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
