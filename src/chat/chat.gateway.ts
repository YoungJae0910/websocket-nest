import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
  ) {}
  @SubscribeMessage('new_chat')
  async getNewChat(@ConnectedSocket() socket: Socket, @MessageBody() chat: string) {
    const user = await this.userService.findUser(socket.id);
    socket.broadcast.emit(
      'new_chat',
      JSON.stringify({
        chat: chat,
        username: user.username,
        userColor: user.color,
      }),
    );
    this.chatService.createChat(chat, socket.id);
  }
}
