import { BaseEntity } from "src/common/entity/base.entity";
import { Folder } from "src/folder/entity/folder.entity";
import { User } from "src/user/entity/user.entity";
import { Vault } from "src/vault/entity/vault.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Record extends BaseEntity {
    
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    username: string;

    @Column({ nullable: false })
    password: string;

    @ManyToOne(() => Folder, folder => folder.records, { nullable: true, onDelete: 'CASCADE' })
    folder: Folder;

    @ManyToOne(() => Vault, vault => vault.records, { onDelete: 'CASCADE' })
    vault: Vault;

}