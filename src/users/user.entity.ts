import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User { //注意這取名規範
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    email:string
    @Column()
    password: string
}