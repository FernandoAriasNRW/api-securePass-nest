import { BaseEntity } from "src/common/entity/base.entity";
import { Folder } from "src/folder/entity/folder.entity";
import { Vault } from "src/vault/entity/vault.entity";
import { Record } from "src/records/entity/record.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity {
    
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    lastName: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: true })
    profileUrl?: string;

    @Column({ nullable: true })
    profileId?: string;

    @OneToMany(() => Folder, folder => folder.user)
    folders: Folder[];

    @OneToMany(() => Record, record => record.user)
    records: Record[];

    @OneToMany(() => Vault, vault => vault.user)
    vaults: Vault[];

}