import { GcuScholarshipApplicationFormsPage } from './app.po';

describe('gcu-scholarship-application-forms App', function() {
  let page: GcuScholarshipApplicationFormsPage;

  beforeEach(() => {
    page = new GcuScholarshipApplicationFormsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
