import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VaultModule } from './vault/vault.module';
import { FolderModule } from './folder/folder.module';
import { RecordsModule } from './records/records.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT || 5432), 
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'mydatabase',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: process.env.NODE_ENV !== 'production',
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
