import { BaseEntity } from "src/common/entity/base.entity";
import { Column, Entity } from "typeorm";

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

}