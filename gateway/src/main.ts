import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RedocModule } from 'nestjs-redoc';
import { join } from 'path';

import { AppModule } from './app.module';

require('module-alias/register');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('The API description')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const redocOptions = {
    title: 'My API',
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
    // auth: {
    //   enabled: true,
    //   user: 'admin',
    //   password: '123',
    // },
    // tagGroups: [
    //   {
    //     name: 'Auth & User',
    //     tags: ['Auth', 'Users', 'UserRoles', 'Roles', 'Features'],
    //   },
    //   {
    //     name: 'Billing',
    //     tags: ['Accounts', 'Plans'],
    //   },
    //   {
    //     name: 'Tools',
    //     tags: ['Sentiment', 'Forms'],
    //   },
    //   {
    //     name: 'Developers',
    //     tags: ['Apps', 'Webhooks', 'Health'],
    //   },
    // ],
  };

  await RedocModule.setup('/api', app, document, redocOptions);

  app.setGlobalPrefix('api');

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
