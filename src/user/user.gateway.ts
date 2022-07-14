import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserService } from './user.service';

@WebSocketGateway()
export class UserGateway {
  constructor(private userService: UserService) {}
  @SubscribeMessage('new_user')
  async createUser(
    @ConnectedSocket() socket: Socket,
    @MessageBody() username: string,
  ) {
    const user = await this.userService.createUser(socket.id, username);
    return user;
  }
}
