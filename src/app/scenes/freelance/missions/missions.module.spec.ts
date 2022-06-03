import { MissionsModule } from './missions.module';

describe('MissionsModule', () => {
  let missionsModule: MissionsModule;

  beforeEach(() => {
    missionsModule = new MissionsModule();
  });

  it('should create an instance', () => {
    expect(missionsModule).toBeTruthy();
  });
});
