import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import RealEstate from "./realEstate.entity";
import User from "./user.entity";

@Entity('schedules')
class Schedule {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'date'})
    date: string | Date

    @Column({type: 'time'})
    hour: string 

    @ManyToOne(() => RealEstate)
    realEstate: RealEstate

    @ManyToOne(() => User)
    user: User
}

export default Schedule