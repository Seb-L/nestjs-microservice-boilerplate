import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { AuthGuard } from '@/auth/guards/auth.guard';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Crud({
  model: {
    type: Role,
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
@Controller('roles')
export class RolesController implements CrudController<Role> {
  constructor(public service: RolesService) {}
}
