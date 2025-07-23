import { BaseEntity } from "src/common/entity/base.entity";
import { IsString, IsOptional, IsEmail, Min, MinLength, MaxLength, max, maxLength } from 'class-validator';


export class CreateUserDto extends BaseEntity {
    @IsString()
    @MaxLength(50)
    name: string;

    @IsString()
    @MaxLength(80)
    lastName: string;

    @IsString()
    @MinLength(8)
    @MaxLength(30)
    password: string;

    @IsEmail()
    @MaxLength(100)
    email: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    role?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    profileUrl?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    profileId?: string;
}