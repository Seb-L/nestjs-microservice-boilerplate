import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { AuthGuard } from '@/auth/guards/auth.guard';

import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Plan } from './entities/plan.entity';
import { PlansService } from './plans.service';

@ApiTags('Plans')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Crud({
  model: {
    type: Plan,
  },
  dto: {
    create: CreatePlanDto,
    update: UpdatePlanDto,
    replace: UpdatePlanDto,
  },
  query: {
    join: {
      account: {
        eager: true,
      },
    },
  },
})
@Controller('plans')
export class PlansController implements CrudController<Plan> {
  constructor(public service: PlansService) {}
}
