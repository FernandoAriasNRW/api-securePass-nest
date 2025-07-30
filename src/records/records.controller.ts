import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/createRecord.dto';
import { RecordUpdateDto } from './dto/updateRecord.dto';
import { BadResponseDto, SuccessRecordsResponseDto, SuccessResponseDto } from 'src/utils/swagger/response.dto';

@ApiTags('Records')
@ApiOkResponse({
    description: 'Records operations', 
    type: SuccessResponseDto, // Assuming the response is of type CreateRecordDto
})
@ApiBadRequestResponse({
    description: 'Invalid ID format',
    type: BadResponseDto // Assuming the response is of type CreateRecordDto
})
@Controller('records')
export class RecordsController {

    constructor(
        private readonly recordsService: RecordsService // Replace with actual service type
    ) {}

    @ApiOkResponse({
        description: 'List of records retrieved successfully',
        type: SuccessRecordsResponseDto, // Assuming the response is of type CreateRecordDto
    })
    @Get('')
    async getRecords(@Query() query: any) {
        // Logic to retrieve records will go here
        return this.recordsService.find(query); // Assuming findAll method exists in RecordsService
    }

    @Get(':id')
    async getRecordById(@Query('id', ParseUUIDPipe) id: string) {  
        // Logic to retrieve a record by ID will go here
        return this.recordsService.findById({ id }); // Placeholder for getting a record by ID
    }

    @ApiBody({
        type: CreateRecordDto
    })
    @Post('')
    async createRecord(@Body() createRecordDto: CreateRecordDto) {
        // Logic to create a record will go here
        return this.recordsService.create(createRecordDto); // Assuming create method exists in RecordsService
    }

    @ApiBody({
        type: RecordUpdateDto
    })
    @Patch(':id')
    async updateRecord(@Param('id', ParseUUIDPipe) id: string, @Body() updateRecordDto: RecordUpdateDto) {
        // Logic to update a record will go here

        if (!updateRecordDto) {
            throw new NotFoundException('Record to update not found');
        }

        return this.recordsService.update(id, updateRecordDto); // Assuming update method exists in RecordsService
    }

    @Delete(':id')
    async deleteRecord(@Param('id', ParseUUIDPipe) id: string) {

        // Logic to delete a record will go here
        const response = await this.recordsService.delete(id);  

        if (!response) {
            throw new BadRequestException(`Record with ID ${id} not found`);
        }

        return response; // Assuming delete method exists in RecordsService
    }

}
