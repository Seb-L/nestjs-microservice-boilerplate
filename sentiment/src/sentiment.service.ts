import { Injectable } from '@nestjs/common';
import * as sentiment from 'multilang-sentiment';

@Injectable()
export class SentimentService {
  analyse(sentence: string, lang = 'en') {
    return sentiment(sentence, lang);
  }
}
