import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]) // Specify entities here if needed
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
