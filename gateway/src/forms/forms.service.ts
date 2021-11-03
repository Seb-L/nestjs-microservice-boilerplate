import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Form } from './entities/form.entity';

@Injectable()
export class FormsService extends TypeOrmCrudService<Form> {
  constructor(@InjectRepository(Form) repo) {
    super(repo);
  }
}
