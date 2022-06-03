import { EntrepriseModule } from './entreprise.module';

describe('EntrepriseModule', () => {
  let entrepriseModule: EntrepriseModule;

  beforeEach(() => {
    entrepriseModule = new EntrepriseModule();
  });

  it('should create an instance', () => {
    expect(entrepriseModule).toBeTruthy();
  });
});
