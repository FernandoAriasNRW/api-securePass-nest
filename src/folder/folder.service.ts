import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './entity/folder.entity';
import { Repository } from 'typeorm';
import { CreateFolderDto } from './dto/createFolder.dto';
import { FolderUpdateDto } from './dto/updateFolder.dto';

@Injectable()
export class FolderService {


    constructor(
        @InjectRepository(Folder) private readonly folderRepository: Repository<Folder>
    ) { }

    async getFolders(query: any) {

        if (query && Object.keys(query).length > 0) {
            // Logic to retrieve folders based on the filter
            // This is a placeholder implementation

            const folders = await this.folderRepository.find({
                where: query,
                relations: ['records']
            });

            if (!folders || folders.length === 0) {
                return {
                    statusCode: 404,
                    message: 'No folders found',
                };
            }

            return {
                statusCode: 200,
                message: 'Folders retrieved successfully',
                data: folders,
            };
        }
        
        const folders = await this.folderRepository.find({
            relations: ['records'] 
        });

        if (!folders || folders.length === 0) {
            return {
                statusCode: 404,
                message: 'No folders found',
            }
        }

        return {
            statusCode: 200,
            message: 'Folders retrieved successfully',
            data: folders,
        };
    }

    async getFolderById(id: string) {
        // Logic to retrieve a folder by ID
        const folder = await this.folderRepository.findOne({ 
            where: { id },          
            relations: ['records'],
        });

        if (!folder) {
            return {
                statusCode: 404,
                message: 'Folder not found',
            };
        }

        return {
            statusCode: 200,
            message: 'Folder retrieved successfully',
            data: folder,
        };
    }

    async create(createFolderDto: CreateFolderDto) {
        // Logic to create a folder
        const folder = this.folderRepository.create(createFolderDto);

        await this.folderRepository.save(folder);

        return {
            statusCode: 201,
            message: 'Folder created successfully',
            data: folder,
        };
    }

    async update(id: string, updateFolderDto: FolderUpdateDto) {
        // Logic to update a folder
        const folder = await this.folderRepository.findOne({ where: { id } });

        if (!folder) {
            return null; // Folder not found
        }

        Object.assign(folder, updateFolderDto);
        
        await this.folderRepository.save(folder);

        return {
            statusCode: 200,
            message: 'Folder updated successfully',
            data: folder,
        };
    }

    async delete(id: string) {
        // Logic to delete a folder
        const folder = await this.folderRepository.findOne({ where: { id } });

        if (!folder) {
            return null; // Folder not found
        }

        await this.folderRepository.softRemove(folder);

        return {
            statusCode: 200,
            message: 'Folder deleted successfully',
        };
    }

}
