import { SurveyAppPage } from './app.po';

describe('survey-app App', () => {
  let page: SurveyAppPage;

  beforeEach(() => {
    page = new SurveyAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
