// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/user/entity/user.entity';
import { Folder } from 'src/folder/entity/folder.entity';
import { Record } from 'src/records/entity/record.entity';
import { Vault } from 'src/vault/entity/vault.entity';

// app.module.ts
ConfigModule.forRoot({
  isGlobal: true         
});

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASS'),
  database: configService.get<string>('DB_NAME'),
  entities: [User, Folder, Record, Vault],
  synchronize: true, // ¡No usar en producción!
  ssl: {
    rejectUnauthorized: false, // Configurar según tu entorno
  }
});
