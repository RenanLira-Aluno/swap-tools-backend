import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserModel } from "../models/";
import { RefreshToken } from "./refreshToken.entity";
import { Address } from "./address.entity";
import { Tool } from "./tool.entity";
import { PhotoUser } from "./photo-user.entity";


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


  @Column({ nullable: true })
  photo_id: string

  @Column({ nullable: true })
  address_id: string;

  @Column({ nullable: true })
  isAuthProvided?: boolean

  @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
  refresh_tokens: RefreshToken[]

  @OneToOne(() => PhotoUser, photo => photo.user, { cascade: true })
  @JoinColumn({ name: "photo_id" })
  photo: PhotoUser

  @OneToOne(() => Address, address => address.user, { cascade: true })
  @JoinColumn({ name: "address_id" })
  address: Address

  @OneToMany(() => Tool, tool => tool.user)
  tools: Tool[]

}
