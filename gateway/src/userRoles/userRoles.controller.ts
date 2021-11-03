import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { AuthGuard } from '@/auth/guards/auth.guard';

import { CreateRoleDto } from './dto/create-userRole.dto';
import { UpdateRoleDto } from './dto/update-userRoles.dto';
import { UserRole } from './entities/userRole.entity';
import { UserRolesService } from './userRoles.service';

@ApiTags('Roles')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Crud({
  model: {
    type: UserRole,
  },
  dto: {
    create: CreateRoleDto,
    update: UpdateRoleDto,
    replace: UpdateRoleDto,
  },
  query: {
    join: {
      role: {
        eager: true,
      },
      user: {
        eager: true,
      },
    },
  },
})
@Controller('user-roles')
export class UserRolesController implements CrudController<UserRole> {
  constructor(public service: UserRolesService) {}
}
