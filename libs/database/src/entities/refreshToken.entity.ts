import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RefreshTokenModel } from "../models/refreshToken.model";
import { User } from "./user.entity";


@Entity()
export class RefreshToken implements RefreshTokenModel {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ unique: true })
    jwt: string;

    @ManyToOne(() => User, user => user.refresh_tokens, {})
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({})
    user_id: string;

    @Column({ nullable: true })
    expires_at?: Date;

    @Column({ nullable: true })
    revoked_at?: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}