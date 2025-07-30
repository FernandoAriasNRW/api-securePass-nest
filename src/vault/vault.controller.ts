import { Body, Controller, Delete, Get, NotFoundException, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { VaultService } from './vault.service';
import { CreateVaultDto } from './dto/createVault.dto';
import { VaultUpdateDto } from './dto/updateVault.dto';
import { UserController } from 'src/user/user.controller';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'user')
@Controller('vault')
export class VaultController {

    constructor(
        private readonly vaultService: VaultService
    ){}


    @Get('')
    async getVaults(@Query() query: any) {
        // Logic to retrieve vaults will go here
        return await this.vaultService.getVaults(query); // Assuming getVaults method exists in VaultService
    }

    @Get(':id')
    async getVaultById(@Query('id') id: string) {
        // Logic to retrieve a vault by ID will go here
        return await this.vaultService.getVaultById(id); // Assuming getVaultById method exists in VaultService
    }

    @Post('')
    async createVault(@Body() createVaultDto: CreateVaultDto, @Req() req) {

        const userId = req.user.userId

        if (!userId) {
            throw new NotFoundException('User not found');
        }

        // Logic to create a vault will go here
         return await this.vaultService.create(createVaultDto, userId); // Assuming create method exists in VaultService
    }

    @Patch(':id')
    async updateVault(@Query('id') id: string, @Body() updateVaultDto: VaultUpdateDto) {
        // Logic to update a vault will go here
        const updatedVault = await this.vaultService.update(id, updateVaultDto); // Assuming update method exists in VaultService

        if (!updatedVault) {
            throw new NotFoundException(`Vault with ID ${id} not found`);
        }

        return updatedVault; // Assuming update method returns the updated vault
    }

    @Delete(':id')
    async deleteVault(@Query('id') id: string) {
        // Logic to delete a vault will go here
        const response = await this.vaultService.delete(id); // Assuming delete method exists in VaultService

        if (!response) {
            throw new NotFoundException(`Vault with ID ${id} not found`);
        }

        return response; // Assuming delete method returns a success message or status
    }

}
