import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/utils/jwt/jwt.strategy';
import { JWT_SECRET_KEY } from 'src/common/constants/jwt.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_SECRET_KEY || 'JWT_SECRET_KEY', // Use environment variable or default value
      signOptions: { expiresIn: '1d' }, // Token expiration time

    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'UserService',
      useClass: UserService
    },
    JwtStrategy
  ]
})
export class AuthModule { }
