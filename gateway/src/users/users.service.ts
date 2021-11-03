import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import * as bcrypt from 'bcrypt';

import { RegisterDto } from '@/auth/dto/register.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo);
  }

  async registerUser(registerDto: RegisterDto) {
    const result = await this.findOne({ where: { email: registerDto.email } });

    if (result) {
      throw new ConflictException();
    } else {
      const newUser = await this.repo.create({
        email: registerDto.email,
        password: await bcrypt.hash(registerDto.password, 10),
      });

      return this.repo.save(newUser);
    }
  }

  set2FASecret(userId: number, secret: string) {
    return this.repo.update(userId, { twoFactorAuthenticationSecret: secret });
  }

  confirmUserEMail(userId: number) {
    return this.repo.update(userId, { isEmailConfirmed: true });
  }
}
