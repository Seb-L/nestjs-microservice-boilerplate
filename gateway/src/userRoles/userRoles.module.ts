import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRole } from './entities/userRole.entity';
import { UserRolesController } from './userRoles.controller';
import { UserRolesService } from './userRoles.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  providers: [UserRolesService],
  exports: [TypeOrmModule],
  controllers: [UserRolesController],
})
export class UserRolesModule {}
