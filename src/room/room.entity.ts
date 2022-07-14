import { Chat } from 'src/chat/chat.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  roomId: string;

  @ManyToMany(() => User, (user) => user.rooms)
  users: User[];

  @OneToMany(() => Chat, (chat) => chat.room)
  chats: Chat[];
}
