import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/createFolder.dto';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BadResponseDto, SuccessResponseDto } from 'src/utils/swagger/response.dto';
import { FolderUpdateDto } from './dto/updateFolder.dto';

@ApiTags('Folder')
@ApiOkResponse({
    description: 'Records operations', 
    type: SuccessResponseDto, // Assuming the response is of type CreateRecordDto
})
@ApiBadRequestResponse({
    description: 'Invalid ID format',
    type: BadResponseDto // Assuming the response is of type CreateRecordDto
})
@Controller('folder')
export class FolderController {

    constructor(
        private readonly folderService: FolderService
    ) {}


    @Get()
    async getFolders(@Query() query: any) {
        
        const folders = await this.folderService.getFolders(query);

        return folders;
    }

    @Get(':id')
    async getFolderById(@Param('id', ParseUUIDPipe) id: string) {
        
        const folder = await this.folderService.getFolderById(id);

        return folder;
    }

    @ApiBody({
        type: CreateFolderDto
    })
    @Post()
    async createFolder(@Body() createFolderDto: CreateFolderDto) {
       
        const folder = await this.folderService.create(createFolderDto);

        return folder;
    }

    @ApiBody({
        type: FolderUpdateDto
    })
    @Patch(':id')
    async updateFolder(@Param('id', ParseUUIDPipe) id: string, @Body() updateFolderDto: FolderUpdateDto) {
        // Logic to update a folder will go here
        const updatedFolder = await this.folderService.update(id, updateFolderDto);

        if (!updatedFolder) {
            throw new NotFoundException(`Folder with ID ${id} not found`);
        }

        return updatedFolder; // Assuming update method returns the updated folder
    }

    @Delete(':id')
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        // Logic to delete a folder will go here
        const response = await this.folderService.delete(id);

        if (!response) {
            throw new NotFoundException(`Folder with ID ${id} not found`);
        }

        return response; // Assuming delete method returns a success message or status
    }

}
