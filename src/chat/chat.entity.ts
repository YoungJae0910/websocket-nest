import { Room } from 'src/room/room.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.chats)
  user: User;

  @ManyToOne(() => Room, (room) => room.chats)
  room: Room;
}
