import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Feature } from './entities/feature.entity';

@Injectable()
export class FeaturesService extends TypeOrmCrudService<Feature> {
  constructor(@InjectRepository(Feature) repo) {
    super(repo);
  }
}
