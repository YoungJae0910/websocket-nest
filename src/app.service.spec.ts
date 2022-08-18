import { AppService } from './app.service';

describe('appService', () => {
  let appService: AppService;
  beforeEach(() => {
    appService = new AppService();
  });

  it('test', () => {
    const str = appService.getHello();
    expect(str).toBe('Hello World!!');
  });
});
