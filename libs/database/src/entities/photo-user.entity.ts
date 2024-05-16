import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Photo } from "./photo.entity";
import { User } from "./user.entity";


@Entity()
export class PhotoUser extends Photo {

  @OneToOne(() => User, user => user.photo)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

}
