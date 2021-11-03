import { Test, TestingModule } from '@nestjs/testing';
import { SentimentController } from './sentiment.controller';

describe('sentimentController', () => {
  let sentimentController: SentimentController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SentimentController],
    }).compile();

    sentimentController = app.get<SentimentController>(SentimentController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sentimentController.getHello()).toBe('Hello World!');
    });
  });
});
