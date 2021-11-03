import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { lastValueFrom } from 'rxjs';

import { Webhook } from './entities/webhook.entity';
import { WebhookEvent } from './events/webhook.event';

@Injectable()
export class WebhooksService extends TypeOrmCrudService<Webhook> {
  constructor(
    @InjectRepository(Webhook) repo,
    private httpService: HttpService,
  ) {
    super(repo);
  }

  async callWebhook({ name, accountId, payload }: WebhookEvent) {
    const webhook = await this.repo.findOne({
      where: { name, accountId },
    });

    if (webhook && webhook.callbackUrl) {
      const res = this.httpService.post(webhook.callbackUrl, {
        webhook: name,
        payload,
      });
      return lastValueFrom(res);
    }
  }
}
