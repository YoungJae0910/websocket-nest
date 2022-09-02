import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(':id')
  async getOneChat(@Param('id') chatId: number) {
    return await this.chatService.getOneChat(chatId);
  }

  @Get()
  async getAllChat() {
    return await this.chatService.getAllChat();
  }
}
