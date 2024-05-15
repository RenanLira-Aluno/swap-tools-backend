import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserModel } from "../models/";
import { RefreshToken } from "./refreshToken.entity";
import { Photo } from "./photo.entity";
import { Address } from "./address.entity";


@Entity()
export class User implements UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: false })
  isAdmin: boolean

  @Column({ nullable: true })
  phone: string;

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

  @OneToOne(() => Photo, photo => photo.user, { cascade: true })
  @JoinColumn({ name: "photo_id" })
  photo: Photo

  @Column({ nullable: true })
  photo_id: string

  @Column({ nullable: true })
  address_id: string;

  @OneToOne(() => Address, address => address.user, { cascade: true })
  @JoinColumn({ name: "address_id" })
  address: Address

  @Column({ nullable: true })
  isAuthProvided?: boolean

}
