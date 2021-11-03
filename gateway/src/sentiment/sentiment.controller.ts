import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

import { AuthGuard } from '@/auth/guards/auth.guard';
import { SentimentDto } from './dto/sentiment.dto';
// import { EmailConfirmationGuard } from '@/auth/guards/email-confirmation.guard';

@ApiTags('Sentiment')
@ApiBearerAuth()
@UseGuards(AuthGuard)
// @UseGuards(EmailConfirmationGuard)
@Controller('sentiment')
export class SentimentController {
  constructor(
    @Inject('SENTIMENT_SERVICE') private sentimentService: ClientProxy,
  ) {}

  @Post()
  async triggerWebhook(@Body() body: SentimentDto) {
    return this.sentimentService.send('sentiment.analyse', body);
  }
}
