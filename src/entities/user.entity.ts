import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import Schedule from "./schedule.entity";

@Entity('users')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', length: 45})
    name: string

    @Column({ type: 'varchar', length:45, unique:true})
    email: string

    @Column({ type: 'boolean', default:false})
    admin: boolean 

    @Column({ type:'varchar', length: 120})
    password: string
   
    @CreateDateColumn({type: 'date'})
    createdAt?: string | Date

    @UpdateDateColumn({type: 'date'})
    updatedAt?: string | Date
    
    @DeleteDateColumn({ nullable: true, type:'date'})
    deletedAt?: string | Date | null | undefined

    @OneToMany(() => Schedule, (schedule) => schedule.user)
    schedule: Schedule[]

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){

        const isEncrypted: number = getRounds(this.password)

        if(!isEncrypted){
            this.password = hashSync(this.password, 10)
        }
    }
}

export default User