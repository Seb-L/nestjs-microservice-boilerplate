import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { App } from './entities/app.entity';

@Injectable()
export class AppsService extends TypeOrmCrudService<App> {
  constructor(@InjectRepository(App) repo) {
    super(repo);
  }
}
