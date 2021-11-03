import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SentimentService } from './sentiment.service';

@Controller()
export class SentimentController {
  constructor(private readonly sentimentService: SentimentService) {}

  @MessagePattern('sentiment.analyse')
  analyse({ sentence, lang }) {
    return this.sentimentService.analyse(sentence, lang);
  }
}
