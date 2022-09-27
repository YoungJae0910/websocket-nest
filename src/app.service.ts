import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  getHello(): string {
    return 'Hello World!!';
  }

  async cacheRandomNumber() {
    const key = Math.floor((Math.random() * 100) / 100);
    const val = Math.random() * 100;
    console.log(key, val);
    await this.cacheManager.set(key + '', val);

    return key;
  }

  async returnValue(key: string) {
    return await this.cacheManager.get(key);
  }
}
