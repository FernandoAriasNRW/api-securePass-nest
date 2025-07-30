import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';

import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto/updateUser.dto';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BadResponseDto, SuccessResponseDto, SuccessUsersResponseDto } from 'src/utils/swagger/response.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';


@ApiTags('Users')
@ApiOkResponse({
    description: 'Users operations',
    type: SuccessResponseDto, // Assuming the response is of type CreateUserDto
})
@ApiBadRequestResponse({
    description: 'Invalid ID format',
    type: BadResponseDto // Assuming the response is of type CreateUserDto
})
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiOkResponse({
        description: 'List of users retrieved successfully',
        type: SuccessUsersResponseDto,
    })
    @Get('')
    async getUsers() {
        // Logic to get users will go here
        return await this.userService.findAll(); // Assuming findAll method exists in UserService
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'user')
    @Get(':id')
    async getUserById( @Param('id', ParseUUIDPipe) id: string) {
       return await this.userService.getUserById(id); // Placeholder for getting a user by ID
    }

    @ApiBody({
       type: CreateUserDto,
    })
    @Post('')
    async createUser(@Body() createUserDto: CreateUserDto) {
        // Logic to create a user will go here
        return await this.userService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'user')
    @ApiBody({
        type: UserUpdateDto
    })
    @Patch(':id')
    async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() userUpdateDto: UserUpdateDto) {
        // Logic to update a user will go here
        // This is a placeholder implementation
        const userUpdated =  this.userService.update(userUpdateDto, id); 

        if (!userUpdated) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return await userUpdated; // Assuming update method returns the updated user
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        // Logic to delete a user will go here
        // This is a placeholder implementation
        const user = this.userService.getUserById(id);

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // Assuming delete method exists in UserService
        return await this.userService.delete(id);
    }

}
