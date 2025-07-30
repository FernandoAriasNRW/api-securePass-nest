import { Module } from '@nestjs/common';

import { VaultController } from './vault.controller';
import { VaultService } from './vault.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vault } from './entity/vault.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vault]) // Register the Vault entity with TypeORM
  ],
  controllers: [VaultController],
  providers: [VaultService]
})
export class VaultModule {}
