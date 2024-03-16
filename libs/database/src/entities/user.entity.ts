import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserModel } from "../models/";
import { Anuncio } from "./anuncio.entity";

@Entity()
export class User implements UserModel {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    email: string;

    @Column()
    name: string

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Anuncio, anuncio => anuncio.user_id)
    anuncios: Anuncio[];



}