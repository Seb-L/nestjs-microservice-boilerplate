import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { compile } from 'handlebars';
import * as mjml2html from 'mjml';
import { readFileSync } from 'fs';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @MessagePattern('mailer.mailSend')
  mailSend(options: ISendMailOptions) {
    const mjmlFile = readFileSync(
      `${process.cwd()}/templates/${options.template}.mjml`,
      { encoding: 'utf8' },
    );
    const htmlString = mjml2html(mjmlFile);

    return this.mailerService.sendMail({
      ...options,
      template: null,
      context: null,
      html: compile(htmlString.html)(options.context),
    });
  }
}
