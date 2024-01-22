import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventService } from './event.service';
import { Event } from '../models/Event';

describe('EventService', () => {
  let service: EventService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService]
    });
    service = TestBed.inject(EventService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all events', () => {
    const mockEvents: Event[] = [{
      id: 385127,
      title: "Eiffel Tower ",
      type: "family",
      username:"ramya",
      venue: {id: 3626,name: "Le Theatre Des Arts",state: "NV"},
      performers: [ {id: 915759,type: "theater_family",name: "Eiffel Tower De" }]
     }];

    service.getAllEvents().subscribe(events => {
      expect(events).toEqual(mockEvents);
    });

    const req = httpMock.expectOne('http://localhost:8083/api/v1/events');
    expect(req.request.method).toBe('GET');
    req.flush(mockEvents);
  });

  it('should add an event to wishlist', () => {
    const mockEvent: Event = { 
      id: 385127,
      title: "Eiffel Tower ",
      type: "family",
      username:"ramya",
      venue: {id: 3626,name: "Le Theatre Des Arts",state: "NV"},
      performers: [{id: 915759,type: "theater_family",name: "Eiffel Tower De"}]
    };
    spyOn(sessionStorage,'getItem')
    .withArgs('Username').and.returnValue('{"Username":"ramya"}')
    .withArgs('token').and.returnValue('token');
    spyOn(JSON,'parse').and.callThrough();
    service['user']='ramya'

    service.addEventToWishlist(mockEvent).subscribe(response => {
      expect(response).toBeTruthy();
      expect(req.request.body.username).toBe('ramya');
    });

    const req = httpMock.expectOne('http://localhost:8084/api/v1/wishlist/addEvent/ramya');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush(mockEvent);
  });

  it('should get all wishlisted events', () => {
    const mockWishlistedEvents: any[] = [{ 
      id: 385127,
      title: "Eiffel Tower ",
      type: "family",
      username:"ramya",
      venue: {id: 3626,name: "Le Theatre Des Arts",state: "NV"},
      performers: [{id: 915759,type: "theater_family",name: "Eiffel Tower De"}]
     }];

    spyOn(sessionStorage,'getItem')
    .withArgs('Username').and.returnValue('{"Username":"ramya"}')
    .withArgs('token').and.returnValue('token');
    spyOn(JSON,'parse').and.callThrough();
    service['user']='ramya'

     service.getAllWishlistedEvents().subscribe(events => {
     expect(events).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8084/api/v1/wishlist/ramya');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush(mockWishlistedEvents);
  });

  it('should delete a wishlisted event', () => {
    const mockEvent: Event = { 
      id: 385127,
      title: "Eiffel Tower ",
      type: "family",
      username:"ramya",
      venue: {id: 3626,name: "Le Theatre Des Arts",state: "NV"},
      performers: [{id: 915759,type: "theater_family",name: "Eiffel Tower De"}]
    };

    spyOn(sessionStorage,'getItem')
    .withArgs('Username').and.returnValue('{"Username":"ramya"}')
    .withArgs('token').and.returnValue('token');
    spyOn(JSON,'parse').and.callThrough();
    service['user']='ramya'

    service.deleteWishlistedEvent(385127).subscribe(response => {
      expect(response).toBeTruthy(); 
    });

    const req = httpMock.expectOne('http://localhost:8084/api/v1/wishlist/deleteEvent/385127/ramya');
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush(mockEvent);
  });
});
