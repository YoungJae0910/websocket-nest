import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { ChatModule } from './chat/chat.module';

const returnEnvPath = () => {
  if (process.env.NODE_ENV === 'local') {
    return '.local.env';
  } else if (process.env.NODE_ENV === 'dev') {
    return '.development.env';
  } else {
    return '.production.env';
  }
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: returnEnvPath(),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: 'root',
      password: process.env.DB_PASSWORD,
      database: 'chat',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    RoomModule,
    ChatModule,
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: '6379',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
