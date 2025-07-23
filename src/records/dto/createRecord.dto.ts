import { BaseEntity } from "src/common/entity/base.entity";
import { IsString, IsOptional, IsEmail, MinLength, MaxLength } from 'class-validator';


export class CreateRecordDto extends BaseEntity {

    @IsString()
    @MaxLength(25)
    name: string;

    @IsString()
    @MaxLength(255)
    decription: string;

    @IsString()
    @MinLength(8)
    @MaxLength(30)
    password: string;

    @IsOptional()
    @IsEmail()
    @MaxLength(100)
    email?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    username?: string;

}