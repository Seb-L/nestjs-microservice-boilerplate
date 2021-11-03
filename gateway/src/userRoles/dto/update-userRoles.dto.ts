import { PartialType } from '@nestjs/swagger';

import { CreateRoleDto } from './create-userRole.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
