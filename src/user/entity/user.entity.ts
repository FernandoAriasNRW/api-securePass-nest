import { BaseEntity } from "src/common/entity/base.entity";
import { Vault } from "src/vault/entity/vault.entity";
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

    

}