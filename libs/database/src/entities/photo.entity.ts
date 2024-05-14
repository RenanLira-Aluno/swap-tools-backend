import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PhotoModel } from "../models";
import { User } from "./user.entity";


@Entity()
export class Photo implements PhotoModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;


  @OneToOne(() => User, user => user.photo)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  user_id: string;

  @Column()
  url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
