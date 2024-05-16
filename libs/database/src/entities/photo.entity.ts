import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PhotoModel } from "../models";
import { User } from "./user.entity";



export class Photo implements PhotoModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column()
  url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
