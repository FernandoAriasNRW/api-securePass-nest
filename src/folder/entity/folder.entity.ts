import { BaseEntity } from "src/common/entity/base.entity";
import { User } from "src/user/entity/user.entity";
import { Vault } from "src/vault/entity/vault.entity";
import { Record } from "src/records/entity/record.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Folder extends BaseEntity {
    
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => User, user => user.folders, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Vault, vault => vault.folders, { onDelete: 'CASCADE' })
    vault: Vault;

    @OneToMany(() => Record, record => record.folder)
    records: Record[];

}