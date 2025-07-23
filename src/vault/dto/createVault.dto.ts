import { BaseEntity } from "src/common/entity/base.entity";
import { IsString, IsOptional, MaxLength } from 'class-validator';


export class CreateVaultDto extends BaseEntity {

    @IsString()
    @MaxLength(25)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    description: string;

}