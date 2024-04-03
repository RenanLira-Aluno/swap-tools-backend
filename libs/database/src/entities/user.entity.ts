import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserModel } from "../models/";
import { RefreshToken } from "./refreshToken.entity";


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

    @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
    refresh_tokens: RefreshToken[]

}