import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Address from "./address.entity";
import Category from "./category.entity";
import Schedule from "./schedule.entity";

@Entity('real_estate')
class RealEstate {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'boolean', default:false})
    sold: boolean 

    @Column({type: 'decimal', precision:12, scale:2, default:0})
    value: string | number 

    @Column({type: 'integer'})
    size: number

    @CreateDateColumn({type: 'date'})
    createdAt: string | Date

    @UpdateDateColumn({type: 'date'})
    updatedAt: string | Date

    @OneToOne(() => Address, (address) => address.realEstate)
    @JoinColumn()
    address: Address

    @ManyToOne(() => Category, (category) =>category.realEstate)
    category: Category

    @OneToMany(() => Schedule, (schedule)=>schedule.realEstate)
    schedules: Schedule[]


}

export default RealEstate