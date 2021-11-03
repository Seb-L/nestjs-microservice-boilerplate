import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Plan } from './entities/plan.entity';

@Injectable()
export class PlansService extends TypeOrmCrudService<Plan> {
  constructor(@InjectRepository(Plan) repo) {
    super(repo);
  }
}
