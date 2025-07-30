import { BaseEntity } from "src/common/entity/base.entity";
import { Folder } from "src/folder/entity/folder.entity";
import { User } from "src/user/entity/user.entity";
import { Record } from "src/records/entity/record.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Vault extends BaseEntity {
    
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => User, user => user.vaults, { onDelete: 'CASCADE', eager: true })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: string; // Foreign key to User entity

    @OneToMany(() => Folder, folder => folder.vault)
    folders: Folder[];

    @OneToMany(() => Record, record => record.vault)
    records: Record[];

}