import { ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventsComponent } from './events.component';
import { EventService } from 'src/app/services/event.service';
import { of, throwError } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;
  let eventService: EventService;

  beforeEach(async() => {

    await TestBed.configureTestingModule({
      declarations: [EventsComponent,HeaderComponent,FooterComponent],
      imports:[HttpClientTestingModule,MatToolbarModule,MatIconModule,RouterTestingModule],
      providers: [EventService]
    }).compileComponents();

    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    eventService = TestBed.inject(EventService) as jasmine.SpyObj<EventService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getEvents', () => {
    spyOn(component, 'getEvents');
    component.ngOnInit();
    expect(component.getEvents).toHaveBeenCalled();
  });

  it('should add event to wishlist', () => {
    const mockEvents={
      id:1 ,
      username:"ramya",
      title: "Eiffel Tower ",
      type: "family",
      venue: { id: 3626,name: "Le Theatre Des Arts",state: "NV"},
      performers: [{id: 915759,type: "theater_family",name: "Eiffel Tower De"}]
    };
    spyOn(eventService, 'addEventToWishlist').and.returnValues(of(mockEvents));
    component.addToWishlist(mockEvents);
    expect(eventService.addEventToWishlist).toHaveBeenCalled();
    expect(component.event).toEqual((mockEvents));
  });

  it('should handle error when adding event to wishlist', () => {
    const mockEvents={
      id:1 ,
      username:"ramya",
      title: "Eiffel Tower ",
      type: "family",
      venue: { id: 3626,name: "Le Theatre Des Arts",state: "NV"},
      performers: [{id: 915759,type: "theater_family",name: "Eiffel Tower De"}]
    }; 
    spyOn(eventService, 'addEventToWishlist').and.returnValue(throwError({ error: 'Event already present in wishlist' }));
    spyOn(window, 'alert');
    component.addToWishlist(mockEvents);
    expect(window.alert).toHaveBeenCalledWith('Event already present in wishlist');
  })
});
