describe('Globals factory', function() {
  var Globals;

  beforeEach(angular.mock.module('services'));

  beforeEach(inject(function(_Globals_){
    Globals = _Globals_;
  }));

  it('factory should exist', function() {
    expect(Globals).toBeDefined();
  });

  it('selections should exist', function() {
    expect(Globals.selections).toBeDefined();
  });

  it('setSelectedRecipient function should exist', function() {
    expect(Globals.setSelectedRecipient).toBeDefined();
  });

  it('setSelectedRecipient function should set given recipient', function() {
    var recipient = "Jackie Chan"

    expect(Globals.setSelectedRecipient(recipient)).toEqual(undefined);
    expect(Globals.selections.recipient).toEqual(recipient);

  });
});