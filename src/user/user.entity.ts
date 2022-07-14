import { Chat } from 'src/chat/chat.entity';
import { Room } from 'src/room/room.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  socketId: string;

  @Column()
  username: string;

  @Column()
  color: string;

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];

  @ManyToMany(() => Room, (room) => room.users)
  @JoinTable()
  rooms: Room[];
}
