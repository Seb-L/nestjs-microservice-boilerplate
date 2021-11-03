import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { AuthGuard } from '@/auth/guards/auth.guard';

import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './entities/form.entity';

@ApiTags('Forms')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Crud({
  model: {
    type: Form,
  },
  dto: {
    create: CreateFormDto,
    update: UpdateFormDto,
    replace: UpdateFormDto,
  },
  query: {
    join: {
      account: {
        eager: true,
      },
    },
  },
})
@Controller('forms')
export class FormsController implements CrudController<Form> {
  constructor(public service: FormsService) {}
}
