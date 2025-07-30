import { ApiProperty } from "@nestjs/swagger";
import { CreateFolderDto } from "src/folder/dto/createFolder.dto";
import { CreateRecordDto } from "src/records/dto/createRecord.dto";
import { CreateUserDto } from "src/user/dto/createUser.dto";

export class BadResponseDto {

 
    @ApiProperty({
        description: 'The data returned in the response',
        type: String,
    })
    error: string;

    @ApiProperty({
        description: 'Status code of the response',
        type: String,
    })
    message: string;

    @ApiProperty({
        description: 'Indicates whether the request was successful',
        type: Number,
    })
    statusCode: number;

}

export class SuccessResponseDto {

    @ApiProperty({
        description: 'Status code of the response',
        type: Number,
    })
    statusCode: number;

    @ApiProperty({
        description: 'Message indicating the result of the operation',
        type: String,
    })
    message: string;

    @ApiProperty({
        description: 'Data returned in the response',
        type: Object,
    })
    data: any;

}

export class SuccessUsersResponseDto {

    @ApiProperty({
        description: 'Status code of the response',
        type: Number,
    })
    statusCode: number;

    @ApiProperty({
        description: 'Message indicating the result of the operation',
        type: String,
    })
    message: string;

    @ApiProperty({
        description: 'List of users retrieved successfully',
        type: [CreateUserDto],
    })
    data: CreateUserDto[];

}

export class SuccessRecordsResponseDto {

    @ApiProperty({
        description: 'Status code of the response',
        type: Number,
    })
    statusCode: number;

    @ApiProperty({
        description: 'Message indicating the result of the operation',
        type: String,
    })
    message: string;

    @ApiProperty({
        description: 'List of users retrieved successfully',
        type: [CreateRecordDto],
    })
    data: CreateRecordDto[];

}