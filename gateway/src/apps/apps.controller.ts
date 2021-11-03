import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { AuthGuard } from '@/auth/guards/auth.guard';

import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { App } from './entities/app.entity';

@ApiTags('Apps')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Crud({
  model: {
    type: App,
  },
  dto: {
    create: CreateAppDto,
    update: UpdateAppDto,
    replace: UpdateAppDto,
  },
  query: {
    join: {
      account: {
        eager: true,
      },
    },
  },
})
@Controller('apps')
export class AppsController implements CrudController<App> {
  constructor(public service: AppsService) {}
}
