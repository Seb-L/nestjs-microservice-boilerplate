import { Test, TestingModule } from '@nestjs/testing';

import { UserRolesController } from './userRoles.controller';
import { UserRolesService } from './userRoles.service';

describe('UserRolesController', () => {
  let controller: UserRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRolesController],
      providers: [UserRolesService],
    }).compile();

    controller = module.get<UserRolesController>(UserRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
