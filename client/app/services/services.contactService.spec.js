describe('ContactService Factory', function() {
  var mockDataService, ContactService;

  // beforeEach(angular.mock.module('services'));

  beforeEach(function(){
  //   module(function($provide) {
  //     $provide.service('DataService', function(){
  //       this.createContact = jasmine.createSpy('createContact');
  //     });
  //   });
  //   module('services');
  });

  // beforeEach(inject(function(_ContactService_, _DataService_) {
  //   mockDataService = _DataService_;
  //   ContactService = _ContactService_;
  // }));

  it('factory should exist', function() {
    expect(ContactService).toBeDefined();
  });

  it('contacts array should exist', function() {
    expect(ContactService.contacts).toEqual([]);
  });

  it('createContact function should be set to corresponding function in DataService', function() {
    ContactService.createContact('123@email.com');

    expect(ContactService.createContact).toBeDefined();
    expect(mockDataService.createContact).toHaveBeenCalledWith('123@email.com');


  });

  it('getAllContacts function should be set to corresponding function in DataService', function() {
    ContactService.getAllContacts();

    expect(ContactService.getAllContacts).toBeDefined();
    expect(mockDataService.getAllContacts).toHaveBeenCalledWith('123@email.com');


  });

  it('deleteContact function should be set to corresponding function in DataService', function() {
    ContactService.deleteContact();

    expect(ContactService.deleteContact).toBeDefined();
    expect(mockDataService.deleteContact).toHaveBeenCalledWith('123@email.com');


  });

  it('contactStatusChange function should be set to corresponding function in DataService', function() {
    ContactService.contactStatusChange('123@email.com');

    expect(ContactService.contactStatusChange).toBeDefined();
    expect(mockDataService.contactStatusChange).toHaveBeenCalledWith('123@email.com');


  });
});