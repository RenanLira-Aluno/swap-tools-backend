import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AddressModel } from "../models";
import { User } from "./user.entity";


@Entity()
export class Address implements AddressModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column()
  street: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  complement: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  zipCode: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => User, user => user.address)
  @JoinColumn({ name: "user_id" })
  user: User

  @Column()
  user_id: string

  @Column({ nullable: true })
  latitude: number;

  @Column({ nullable: true })
  longitude: number;

}
