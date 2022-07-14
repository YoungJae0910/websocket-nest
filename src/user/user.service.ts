import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import ColorHash from 'color-hash';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  private colorHash = new ColorHash();
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(socketId: string, username: string) {
    const color = this.colorHash.hex(socketId);
    const user = this.userRepository.create({
      socketId,
      username,
      color,
    });
    await this.userRepository.save(user);
    return user;
  }

  async findUser(socketId: string) {
    const user = await this.userRepository.findOne({
      where: {
        socketId,
      },
    });
    if (user) {
      return user;
    } else {
      return undefined;
    }
  }

  async deleteUser(socketId: string) {
    const user = await this.userRepository.findOne({
      where: {
        socketId,
      },
    });
    await this.userRepository.remove(user);
  }
}
