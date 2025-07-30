import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, MinLength, MaxLength, IsIn } from 'class-validator';

import { BaseEntity } from "src/common/entity/base.entity";
import { UserRole } from '../../common/enums/roles.enum';


export class CreateUserDto extends BaseEntity {

    @ApiProperty()
    @IsString()
    @MaxLength(50)
    name: string;

    @ApiProperty()
    @IsString()
    @MaxLength(80)
    lastName: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(30)
    password: string;

    @ApiProperty()
    @IsEmail()
    @MaxLength(100)
    email: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsIn(['admin', 'user'])
    role?: UserRole;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    profileUrl?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    profileId?: string;

}