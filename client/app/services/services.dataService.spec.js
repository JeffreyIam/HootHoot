describe('DataService Factory', function() {
  var DataService, $httpBackend;
  //
  beforeEach(angular.mock.module('services'));
  beforeEach(inject(function(_DataService_, _$httpBackend_) {
    DataService = _DataService_;
    $httpBackend = _$httpBackend_;
  }));

  it('factory should exist', function() {
    expect(DataService).toBeDefined();
  });

  it('getCurrentUserId function should exist', function() {
    expect(DataService.getCurrentUserId).toBeDefined();
  });

  it('getCurrentUserId function should return local storage id', function() {
    expect(DataService.getCurrentUserId()).toEqual(0);
  });

  it('getRecentMessages function should exist', function() {
    expect(DataService.getRecentMessages).toBeDefined();
  });

  it('getRecentMessages function should make a GET request to /message', function() {
    var success;

    $httpBackend.expectGET('/message').respond(200);

    DataService.getRecentMessages()
      .then(function() {
        success = true;
      });
    $httpBackend.flush();
    expect(success).toEqual(true);
  });

  it('getContacts function should exist', function() {
    expect(DataService.getContacts).toBeDefined();
  });

  it('getContacts function should make a GET request to /contacts', function() {

    var success;

    $httpBackend.expectGET('/contacts').respond(200);

    DataService.getContacts()
      .then(function() {
        success = true;
      });
    $httpBackend.flush();
    expect(success).toEqual(true);
  });

  it('createContact function should exist', function() {
    expect(DataService.createContact).toBeDefined();
  });

  it('createContact function should make a GET request to /contacts', function() {
    var email = "alice@gmail.com", success;

    $httpBackend.expectPOST('/contacts', {newContactEmail: email}).respond(200);

    DataService.createContact(email)
      .then(function() {
        success = true;
      });
    $httpBackend.flush();
    expect(success).toEqual(true);
  });

  it('deleteContact function should exist', function() {
    expect(DataService.deleteContact).toBeDefined();
  });

  it('deleteContact function should make a DELETE request to /contacts', function() {
    var contactId = 123, success;

    $httpBackend.expectDELETE('/contacts').respond(200);

    DataService.deleteContact(contactId)
      .then(function() {
        success = true;
      });
    $httpBackend.flush();
    expect(success).toEqual(true);
  });

  it('getCommands function should exist', function() {
    expect(DataService.getCommands).toBeDefined();
  });

  it('getCommands function should make a DELETE request to /contacts', function() {
    var success;

    $httpBackend.expectGET('/commands').respond(200);

    DataService.getCommands()
      .then(function() {
        success = true;
      });
    $httpBackend.flush();
    expect(success).toEqual(true);
  });

  it('createCommand function should exist', function() {
    expect(DataService.createCommand).toBeDefined();
  });

  it('createCommand function should make a POST request to /contacts', function() {
    var command = '/google', success;

    $httpBackend.expectPOST('/commands', '/google').respond(200);

    DataService.createCommand(command)
      .then(function() {
        success = true;
      });
    $httpBackend.flush();
    expect(success).toEqual(true);
  });

  it('dispatchCommand function should exist', function() {
    expect(DataService.dispatchCommand).toBeDefined();
  });

  it('dispatchCommand function should make a POST request to /contacts', function() {
    var postURL = '/reddit', params = 123, success;

    $httpBackend.expectPOST('/reddit', 123).respond(200);

    DataService.dispatchCommand(postURL, params)
      .then(function() {
        success = true;
      });
    $httpBackend.flush();
    expect(success).toEqual(true);
  });

  it('getLocation function should exist', function() {
    expect(DataService.getLocation).toBeDefined();
  });
});
