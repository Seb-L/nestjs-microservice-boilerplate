export class WebhookEvent {
  name: string;
  accountId: number;
  payload: Record<string, any>;

  constructor(params: WebhookEvent) {
    this.name = params.name;
    this.accountId = params.accountId;
    this.payload = params.payload;
  }
}
