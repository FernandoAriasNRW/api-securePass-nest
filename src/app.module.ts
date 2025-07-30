import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VaultModule } from './vault/vault.module';
import { FolderModule } from './folder/folder.module';
import { RecordsModule } from './records/records.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    AuthModule, 
    UserModule, 
    VaultModule, 
    FolderModule, 
    RecordsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
