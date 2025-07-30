import { IsString, IsOptional, MaxLength } from 'class-validator';

import { BaseEntity } from "src/common/entity/base.entity";


export class CreateVaultDto extends BaseEntity {

    @IsString()
    @MaxLength(25)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    description: string;

}