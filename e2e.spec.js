describe('Protractor Demo App', function() {
  it('should fetch countries', function() {
    browser.get('http://localhost:3000/');

    expect(browser.getTitle()).toEqual('Angular 2 Universal Starter');
  });
});
