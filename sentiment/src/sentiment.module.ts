import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SentimentController } from './sentiment.controller';
import { SentimentService } from './sentiment.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `../.env`,
    }),
  ],
  controllers: [SentimentController],
  providers: [SentimentService],
})
export class AppModule {}
