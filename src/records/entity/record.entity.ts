import { Column, Entity } from "typeorm";

@Entity()
export class RecordEntity {
    
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