import { Injectable } from '@nestjs/common';
import { Vault } from './entity/vault.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVaultDto } from './dto/createVault.dto';
import { VaultUpdateDto } from './dto/updateVault.dto';

@Injectable()
export class VaultService {

    constructor(
        @InjectRepository(Vault) private readonly vaultRepository: Repository<Vault>
    ) { }


    async getVaults(query: any) {
        // Logic to retrieve vaults based on the filter
        // This is a placeholder implementation

        if (query && Object.keys(query).length === 0) {
            const vaults = await this.vaultRepository.find({
                where: query,
                relations: ['folders', 'folders.records', 'records'] // Include relations if needed
            });

            if (!vaults || vaults.length === 0) {
                return {
                    statusCode: 404,
                    message: 'No vaults found'
                }
            }

            return {
                statusCode: 200,
                message: 'Vaults retrieved successfully',
                data: vaults,
            };
        }

        const vaults = await this.vaultRepository.find({
            relations: ['folders', 'folders.records', 'records'] // Include relations if needed
        });

        if (!vaults || vaults.length === 0) {
            return {
                statusCode: 404,
                message: 'No vaults found',
            };
        }

        return {
            statusCode: 200,
            message: 'Vaults retrieved successfully',
            data: vaults,
        };
    }


    async getVaultById(id: string) {
        // Logic to retrieve a vault by ID
        const vault = await this.vaultRepository.findOne({
            where: { id },
            relations: ['folders', 'folders.records', 'records'] // Include relations if needed
        });

        if (!vault) {
            return {
                statusCode: 404,
                message: 'Vault not found',
            };
        }

        return {
            statusCode: 200,
            message: 'Vault retrieved successfully',
            data: vault,
        };
    }

    async create(createVaultDto: CreateVaultDto) {
        // Logic to save the vault to the database
        const vault = this.vaultRepository.create(createVaultDto);

        await this.vaultRepository.save(vault);

        return {
            statusCode: 201,
            message: 'Vault created successfully',
            data: vault,
        };
    }

    async update(id: string, updateVaultDto: VaultUpdateDto) {
        // Logic to update the vault in the database
        const vault = await this.vaultRepository.findOne({ where: { id } });

        if (!vault) {
            return null; // Vault not found
        }

        Object.assign(vault, updateVaultDto);
        await this.vaultRepository.save(vault);

        return {
            statusCode: 200,
            message: 'Vault updated successfully',
            data: vault,
        };
    }

    async delete(id: string) {
        // Logic to delete the vault from the database
        const vault = await this.vaultRepository.findOne({ where: { id } });

        if (!vault) {
            return null; // Vault not found
        }

        await this.vaultRepository.softRemove(vault);

        return {
            statusCode: 200,
            message: 'Vault deleted successfully',
        };
    }

}
