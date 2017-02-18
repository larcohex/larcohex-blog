import { NewblogPage } from './app.po';

describe('newblog App', function() {
  let page: NewblogPage;

  beforeEach(() => {
    page = new NewblogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
