import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class SchedulerController {
  constructor(

  ) {}

  @MessagePattern('scheduler.execTask')
  execTask() {

  }
}
