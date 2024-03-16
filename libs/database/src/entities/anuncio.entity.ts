import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AnuncioModel } from "../models";
import { User } from "./user.entity";


@Entity()
export class Anuncio implements AnuncioModel {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    descricao: string;

    @Column()
    disponivel: boolean;

    @Column()
    doacao: boolean;

    @ManyToOne(() => User, user => user.anuncios)
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}