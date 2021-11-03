import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { CrudRequest, ParsedRequest } from '@nestjsx/crud';
import { Response } from 'express';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Register a User
   */
  @Post('auth/register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.usersService.registerUser(registerDto);
    await this.authService.sendVerificationLink(user.email);
    return user;
  }

  /**
   * Confirm registration
   */
  @Get('auth/register/confirm')
  async registerConfirm(
    @ParsedRequest() req: CrudRequest,
    @Query('token') token: string,
    @Res() res: Response,
  ) {
    const email = await this.authService.decodeConfirmationToken(token);
    await this.authService.confirmEmail(req, email);
    res.redirect(this.configService.get('EMAIL_CONFIRMATION_SUCCESS_URL'));
  }

  /**
   * Resend registration confirmation email
   */
  @Post('auth/register/resend-confirm')
  @UseGuards(JwtAuthGuard)
  async resendConfirmationLink(@Req() request: any) {
    const user = await this.usersService.findOne(request.user.id);

    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }

    await this.authService.sendVerificationLink(user.email);
  }

  /**
   * Authenticate a User
   */
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /**
   * Generate 2FA Qr Code
   */
  @UseGuards(JwtAuthGuard)
  @Post('auth/2fa/generate')
  async genQrCode(
    @Res() response: Response,
    @Req() request: Request & { user: User },
  ) {
    const { otpauthUrl } = await this.authService.generate2FASecret(
      request.user,
    );

    return this.authService.pipeQrCodeStream(response, otpauthUrl);
  }
}
