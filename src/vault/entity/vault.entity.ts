import { Column, Entity } from "typeorm";

@Entity()
export class VaultEntity {
    
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    description: string;

}