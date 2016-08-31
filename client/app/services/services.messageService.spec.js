describe('MessageService Factory', function() {
  var CommandService;

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
    expect(MessageService).toBeDefined();
  });

  it('contacts array should exist', function() {
    expect(MessageService.chats).toEqual([]);
  });

  it('getRecentMessages function should be set to corresponding function in DataService', function() {
    MessageService.getRecentMessages();

    expect(MessageService.getRecentMessages).toBeDefined();
    expect(mockDataService.getRecentMessages).toHaveBeenCalledWith('123@email.com');


  });

  it('addMessageToList function should be set to corresponding function in DataService', function() {
    MessageService.addMessageToList();

    expect(MessageService.addMessageToList).toBeDefined();
    expect(mockDataService.addMessageToList).toHaveBeenCalledWith('123@email.com');


  });

  it('markAllRead function should be set to corresponding function in DataService', function() {
    MessageService.markAllRead();

    expect(MessageService.markAllRead).toBeDefined();
    expect(mockDataService.markAllRead).toHaveBeenCalledWith('123@email.com');


  });

  it('processText function should be set to corresponding function in DataService', function() {
    MessageService.processText('123@email.com');

    expect(MessageService.processText).toBeDefined();
    expect(mockDataService.processText).toHaveBeenCalledWith('123@email.com');


  });

  it('sendMessage function should be set to corresponding function in DataService', function() {
    MessageService.sendMessage('123@email.com');

    expect(MessageService.sendMessage).toBeDefined();
    expect(mockDataService.sendMessage).toHaveBeenCalledWith('123@email.com');


  });
});