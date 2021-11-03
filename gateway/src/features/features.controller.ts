import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { AuthGuard } from '@/auth/guards/auth.guard';

import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Feature } from './entities/feature.entity';
import { FeaturesService } from './features.service';

@ApiTags('Features')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Crud({
  model: {
    type: Feature,
  },
  dto: {
    create: CreateFeatureDto,
    update: UpdateFeatureDto,
    replace: UpdateFeatureDto,
  },
  query: {
    join: {
      account: {
        eager: true,
      },
    },
  },
})
@Controller('features')
export class FeaturesController implements CrudController<Feature> {
  constructor(public service: FeaturesService) {}
}
