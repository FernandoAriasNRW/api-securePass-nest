import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entity/user.entity';
import { UserUpdateDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}


    async findAll() {
        // Logic to retrieve all users from the database or any other storage
        const users = await this.userRepository.find();

        return {
            statusCode: 200,
            message: 'Users retrieved successfully',
            data: users,
        }
    }

    async getUserById(id: string) {
        // Logic to retrieve a user by ID from the database or any other storage
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            return {
                statusCode: 404,
                message: 'User not found',
            };
        }

        return {
            statusCode: 200,
            message: 'User retrieved successfully',
            data: user,
        };
    }

    async create(createUserDto: CreateUserDto) {
        // Logic to save the user to the database or any other storage
        // This is a placeholder implementation
        const user = this.userRepository.create(createUserDto);

        await this.userRepository.save(user);

        return {
            statusCode: 201,
            message: 'User created successfully',
            data: user,
        };
    }


    async update(userUpdateDto: UserUpdateDto, id: string) {

        // Logic to update the user in the database or any other storage
        // This is a placeholder implementation
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            return user;
        }

        Object.assign(user, userUpdateDto);

        await this.userRepository.save(user);

        return {
            statusCode: 200,
            message: 'User updated successfully',
            data: user,
        };
    }

    async delete(id: string) {
        // Logic to delete the user from the database or any other storage
        // This is a placeholder implementation
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            return user;
        }

        await this.userRepository.softRemove(user);

        return {
            statusCode: 200,
            message: 'User deleted successfully',
            data: user,
        };
    }

}
