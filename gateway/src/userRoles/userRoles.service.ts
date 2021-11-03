import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { UserRole } from './entities/userRole.entity';

@Injectable()
export class UserRolesService extends TypeOrmCrudService<UserRole> {
  constructor(@InjectRepository(UserRole) repo) {
    super(repo);
  }
}
