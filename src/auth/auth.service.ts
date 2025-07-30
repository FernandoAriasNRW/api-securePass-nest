import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserService') private usersService: UserService,
     private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {

    const user = await this.usersService.findByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;

  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    if (!user) {
      return null;
    }

    return user;

  }
}
