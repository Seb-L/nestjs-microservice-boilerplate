import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerController } from './mailer.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `../.env`,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: configService.get('MAILER_TRANSPORT'),
        defaults: {
          from: '"nestjsboilerplate" <noreply@netsjsboilerplate.com>',
        },
      }),
    }),
  ],
  controllers: [MailerController],
})
export class AppModule {}
