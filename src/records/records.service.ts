import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './entity/record.entity';
import { CreateRecordDto } from './dto/createRecord.dto';
import { RecordUpdateDto } from './dto/updateRecord.dto';

@Injectable()
export class RecordsService {

    constructor(
        @InjectRepository(Record) private readonly recordsRepository: Repository<Record>
    ) {}


    async find(query: any) {
        // Logic to retrieve records based on the filter
        // This is a placeholder implementation

        console.log('Query parameters:', query);

        const records = await this.recordsRepository.find({
            where: query 
        })

        if (!records || records.length === 0) {
            return {
                statusCode: 404,
                message: 'No records found',
            };
        }

        return {
            statusCode: 200,
            message: 'Records retrieved successfully',
            data: records, // Replace with actual data retrieval logic
        };
    }

    async findById({ id }: { id: string }) {
        // Logic to retrieve a record by ID
        const record = await this.recordsRepository.findOne({ where: { id } });

        if (!record) {
            return {
                statusCode: 404,
                message: 'Record not found',
            };
        }

        return {
            statusCode: 200,
            message: 'Record retrieved successfully',
            data: record,
        };
    }

    async create(createRecordDto: CreateRecordDto) {

        // Logic to save the record to the database
        const record = this.recordsRepository.create(createRecordDto);
        await this.recordsRepository.save(record);

        return {
            statusCode: 201,
            message: 'Record created successfully',
            data: record,
        };

    }

    async update(id: string, updateRecordDto: RecordUpdateDto) {
        // Logic to update the record in the database
        const record = await this.recordsRepository.findOne({ where: { id } });

        if (!record) {
            return null; // Record not found
        }

        Object.assign(record, updateRecordDto);
        await this.recordsRepository.save(record);

        return {
            statusCode: 200,
            message: 'Record updated successfully',
            data: record,
        };
    }

    async delete(id: string) {
        // Logic to delete the record from the database
        const record = await this.recordsRepository.findOne({ where: { id } });

        if (!record) {
            return null; // Record not found
        }

        await this.recordsRepository.softRemove(record);

        return {
            statusCode: 200,
            message: 'Record deleted successfully',
            data: record,
        };
    }

}
