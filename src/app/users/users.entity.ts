import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
// import { hashSync } from 'bcryptjs';

@Entity({name: 'users'})
export class UsersEntity {

    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column()
    name: String;

    @Column()
    email: String;
    
    @Column()
    password: String;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @BeforeInsert()
    hashPassword() {
        this.password = this.password
        // this.password = hashSync(this.password, 10)
    }
}