import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from '@/accounts/entities/account.entity';
import { App } from '@/apps/entities/app.entity';
import { Role } from '@/roles/entities/role.entity';
import { UserRole } from '@/userRoles/entities/userRole.entity';
import { User } from '@/users/entities/user.entity';
import { Webhook } from '@/webhooks/entities/webhook.entity';
import { Form } from '@/forms/entities/form.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE_NAME'),
        entities: [App, Account, User, Webhook, Role, UserRole, Form],
        synchronize: true,
        logging: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
