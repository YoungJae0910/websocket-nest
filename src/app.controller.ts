import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  renderIndex() {
    return {
      env: process.env.NODE_ENV,
    };
  }

  @Get('/random')
  async cacheRandomNumber() {
    let key;
    try {
      key = await this.appService.cacheRandomNumber();
    } catch (e) {
      return e;
    }

    return key;
  }

  @Get(':id')
  async returnRandomNumber(@Param('id') key: string) {
    console.log(key);
    return await this.appService.returnValue(key);
  }
}
