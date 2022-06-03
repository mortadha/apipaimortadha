import { FreelanceModule } from './freelance.module';

describe('FreelanceModule', () => {
  let freelanceModule: FreelanceModule;

  beforeEach(() => {
    freelanceModule = new FreelanceModule();
  });

  it('should create an instance', () => {
    expect(freelanceModule).toBeTruthy();
  });
});
