import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    private userService: UserService,
  ) {}

  async createChat(message: string, socketId: string) {
    const user = await this.userService.findUser(socketId);
    if (user) {
      const chat = this.chatRepository.create({
        content: message,
        user,
      });
      this.chatRepository.save(chat);
      return user;
    }
  }
}
