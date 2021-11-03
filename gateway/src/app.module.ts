import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';

import { AppAdminModule } from '@/admin/admin.module';
import { AccountsModule } from '@/accounts/accounts.module';
import { AppsModule } from '@/apps/apps.module';
import { AuthModule } from '@/auth/auth.module';
import { DatabaseModule } from '@/database/database.module';
import { RolesModule } from '@/roles/roles.module';
import { UserRolesModule } from '@/userRoles/userRoles.module';
import { UsersModule } from '@/users/users.module';
import { WebhooksModule } from '@/webhooks/webhooks.module';
import { SentimentModule } from './sentiment/sentiment.module';
import { FormsModule } from './forms/forms.module';
import { HealthModule } from './health/health.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `../.env`,
    }),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    ScheduleModule.forRoot(),
    HealthModule,
    DatabaseModule,
    AppAdminModule,
    AccountsModule,
    AppsModule,
    AuthModule,
    UsersModule,
    WebhooksModule,
    RolesModule,
    UserRolesModule,
    SentimentModule,
    FormsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
