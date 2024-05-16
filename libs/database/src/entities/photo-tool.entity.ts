import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Photo } from "./photo.entity";
import { Tool } from "./tool.entity";

@Entity()
export class PhotoTool extends Photo {

  @ManyToOne(() => Tool, tool => tool.photos)
  @JoinColumn({ name: 'tool_id' })
  tool: Tool;


  @Column()
  tool_id: string;
}
