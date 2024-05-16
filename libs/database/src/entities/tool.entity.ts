import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ToolModel } from "../models";
import { ToolCondition } from "../models/enum/tool-condition.enum";
import { ToolStatus } from "../models/enum/tool-status.enum";
import { User } from "./user.entity";
import { PhotoTool } from "./photo-tool.entity";


@Entity()
export class Tool implements ToolModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.tools)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => PhotoTool, photo => photo.tool, { cascade: true, lazy: true })
  photos: PhotoTool[];

  @Column({
    type: 'enum',
    enum: ToolCondition,
    default: ToolCondition.NEW
  })
  condition: ToolCondition;

  @Column({
    type: 'enum',
    enum: ToolStatus,
    default: ToolStatus.AVAILABLE
  })
  status: ToolStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;




}
