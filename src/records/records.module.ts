import { Module } from '@nestjs/common';

import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './entity/record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record]) // Ensure Record entity is imported here
  ],
  controllers: [RecordsController],
  providers: [RecordsService]
})
export class RecordsModule {}
