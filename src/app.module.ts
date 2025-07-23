import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VaultModule } from './vault/vault.module';
import { FolderModule } from './folder/folder.module';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [AuthModule, UserModule, VaultModule, FolderModule, RecordsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
