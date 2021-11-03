export class CreateWebhookDto {
  id?: number;
  eventName: string;
  callbackUrl: string;
  accountId: number;
}
