import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
// import { TypeOrmModule } from '@nestjs/typeorm';

import { SentimentController } from './sentiment.controller';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Webhook])
  ],
  // exports: [TypeOrmModule],
  controllers: [SentimentController],
  providers: [
    {
      provide: 'SENTIMENT_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('RMQ_URL')],
            queue: 'sentiment_queue',
            queueOptions: {
              durable: false,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class SentimentModule {}
