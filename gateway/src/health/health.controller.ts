import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisOptions, RmqOptions, Transport } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly configService: ConfigService,
    private healthCheckService: HealthCheckService,
    private typeOrmHealthIndicator: TypeOrmHealthIndicator,
    private microserviceHealthIndicator: MicroserviceHealthIndicator,
    private memoryHealthIndicator: MemoryHealthIndicator,
    private diskHealthIndicator: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const database = () =>
      this.typeOrmHealthIndicator.pingCheck('Postgres Database');

    const redis = () =>
      this.microserviceHealthIndicator.pingCheck<RedisOptions>('Redis', {
        transport: Transport.REDIS,
        options: {
          url: `redis://${this.configService.get(
            'REDIS_HOST',
          )}:${this.configService.get('REDIS_PORT')}`,
        },
      });

    // Mailer microservice
    const mailer = () =>
      this.microserviceHealthIndicator.pingCheck<RmqOptions>(
        'Mailer Microservice',
        {
          transport: Transport.RMQ,
          options: {
            urls: [this.configService.get('RMQ_URL') as string],
            queue: 'mailer_queue',
            queueOptions: {
              durable: false,
            },
          },
        },
      );

    // Scheduler microservice
    const scheduler = () =>
      this.microserviceHealthIndicator.pingCheck<RmqOptions>(
        'Scheduler Microservice',
        {
          transport: Transport.RMQ,
          options: {
            urls: [this.configService.get('RMQ_URL') as string],
            queue: 'scheduler_queue',
            queueOptions: {
              durable: false,
            },
          },
        },
      );

    // Sentiment microservice
    const sentiment = () =>
      this.microserviceHealthIndicator.pingCheck<RmqOptions>(
        'Sentiment Analysis Microservice',
        {
          transport: Transport.RMQ,
          options: {
            urls: [this.configService.get('RMQ_URL') as string],
            queue: 'sentiment_queue',
            queueOptions: {
              durable: false,
            },
          },
        },
      );

    // the process should not use more than 300MB memory
    const memory = () =>
      this.memoryHealthIndicator.checkHeap('Memory heap', 300 * 1024 * 1024);

    // The process should not have more than 300MB RSS memory allocated
    const rss = () =>
      this.memoryHealthIndicator.checkRSS('Memory RSS', 300 * 1024 * 1024);

    // the used disk storage should not exceed the 50% of the available space
    const disk = () =>
      this.diskHealthIndicator.checkStorage('Disk health', {
        thresholdPercent: 0.5,
        path: '/',
      });

    return this.healthCheckService.check([
      database,
      redis,
      mailer,
      scheduler,
      sentiment,
      memory,
      rss,
      // disk,
    ]);
  }

  @Get('/status')
  @Render('health')
  render() {
    return this.check().catch((res) => res.response);
  }
}
