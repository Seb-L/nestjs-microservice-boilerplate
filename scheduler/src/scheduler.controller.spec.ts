import { Test, TestingModule } from '@nestjs/testing';
import { MailerController } from './scheduler.controller';

describe('MailerController', () => {
  let mailerController: MailerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MailerController],
    }).compile();

    mailerController = app.get<MailerController>(MailerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mailerController.getHello()).toBe('Hello World!');
    });
  });
});
