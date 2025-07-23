import { Column, Entity } from "typeorm";

@Entity()
export class UserEntity {
    
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