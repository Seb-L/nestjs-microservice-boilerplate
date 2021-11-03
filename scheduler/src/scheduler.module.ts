import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SchedulerController } from './scheduler.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `../.env`,
    }),
  ],
  controllers: [SchedulerController],
})
export class AppModule {}
