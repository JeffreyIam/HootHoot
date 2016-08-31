describe('SocketService Factory', function() {
  var mockDataService, SocketService;

  // beforeEach(angular.mock.module('services'));

  beforeEach(function(){
  //   module(function($provide) {
  //     $provide.service('DataService', function(){
  //       this.createContact = jasmine.createSpy('createContact');
  //     });
  //   });
  //   module('services');
  });

  // beforeEach(inject(function(_SocketService_, _DataService_) {
  //   mockDataService = _DataService_;
  //   SocketService = _SocketService_;
  // }));

  it('factory should exist', function() {
    expect(SocketService).toBeDefined();
  });

  it('addListeners function should be set to corresponding function in DataService', function() {
    SocketService.addListeners();

    expect(SocketService.addListeners).toBeDefined();
    expect(mockDataService.addListeners).toHaveBeenCalledWith('123@email.com');


  });

  it('sendMessage function should be set to corresponding function in DataService', function() {
    SocketService.sendMessage();

    expect(SocketService.sendMessage).toBeDefined();
    expect(mockDataService.sendMessage).toHaveBeenCalledWith('123@email.com');


  });

  it('markRead function should be set to corresponding function in DataService', function() {
    SocketService.markRead();

    expect(SocketService.markRead).toBeDefined();
    expect(mockDataService.markRead).toHaveBeenCalledWith('123@email.com');


  });

  it('register function should be set to corresponding function in DataService', function() {
    SocketService.register();

    expect(SocketService.register).toBeDefined();
    expect(mockDataService.register).toHaveBeenCalledWith('123@email.com');


  });
});