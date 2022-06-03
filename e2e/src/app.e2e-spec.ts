import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', (done: Function) => {
    page.navigateTo();
    page.getParagraphText()
    .then((paragraphText: string) => {
      expect(paragraphText).toEqual('Welcome to noodz!');
      done();
    })
    .catch((err: Error) => done());
  });
});
