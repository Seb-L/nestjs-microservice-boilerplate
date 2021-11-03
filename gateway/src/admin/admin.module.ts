import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/typeorm';
import { Module } from '@nestjs/common';
import AdminJs from 'adminjs';
import * as bcrypt from 'bcrypt';

import { User } from '@/users/entities/user.entity';

import AccountResource from './resources/account.resource';
import AppsResource from './resources/apps.resource';
import UserResource from './resources/user.resource';
import WebhookResource from './resources/webhook.resource';

AdminJs.registerAdapter({ Database, Resource });

@Module({
  imports: [
    AdminModule.createAdmin({
      adminJsOptions: {
        rootPath: '/admin',
        branding: {
          companyName: 'My Company',
          softwareBrothers: false,
        },
        resources: [
          AccountResource,
          UserResource,
          AppsResource,
          WebhookResource,
        ],
        dashboard: {
          component: AdminJs.bundle('./frontend/home.tsx'),
        },
      },
      auth: {
        authenticate: async (email, password) =>
          new Promise(async (resolve, reject) => {
            const user = await User.findOne({ email });

            if (user && (await bcrypt.compare(password, user.password))) {
              return resolve({ email: user.email, avatarUrl: user.avatar });
            } else {
              return reject(false);
            }
          }),
        cookieName: 'adminAuth',
        cookiePassword: 'adminPass',
      },
    }),
  ],
})
export class AppAdminModule {}
