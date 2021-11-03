import { Controller, UseGuards } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';

import { AuthGuard } from '@/auth/guards/auth.guard';
import { EmailConfirmationGuard } from '@/auth/guards/email-confirmation.guard';

import { CreateWebhookDto } from './dto/create-webhook.dto';
import { Webhook } from './entities/webhook.entity';
import { WebhookEvent } from './events/webhook.event';
import { WebhooksService } from './webhooks.service';

/**
 * App are used for developers
 */
@ApiTags('Webhooks')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@UseGuards(EmailConfirmationGuard)
@Crud({
  model: {
    type: Webhook,
  },
  dto: {
    create: CreateWebhookDto,
    update: CreateWebhookDto,
    replace: CreateWebhookDto,
  },
  query: {
    join: {
      account: {
        eager: true,
      },
    },
  },
})
@Controller('webhooks')
export class WebhooksController {
  constructor(public service: WebhooksService) {}

  /**
   * Trigger webhook callback
   */
  @OnEvent('webhook')
  async triggerWebhook(event: WebhookEvent) {
    return this.service.callWebhook(event);
  }
}
