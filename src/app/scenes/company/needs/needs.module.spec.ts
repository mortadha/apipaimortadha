import { NeedsModule } from './needs.module';

describe('NeedsModule', () => {
  let needsModule: NeedsModule;

  beforeEach(() => {
    needsModule = new NeedsModule();
  });

  it('should create an instance', () => {
    expect(needsModule).toBeTruthy();
  });
});
