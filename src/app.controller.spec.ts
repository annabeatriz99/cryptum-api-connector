import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('/health', () => {
    it('should return status 200', () => {
      expect(appController.getHealthAlive()).toEqual({ status: 200 });
      expect(appController.getHealthReady()).toEqual({ status: 200 });
    });
  });
});
