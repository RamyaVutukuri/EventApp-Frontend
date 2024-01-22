import { TestBed, ComponentFixture } from '@angular/core/testing';
import { WishlistComponent } from './wishlist.component';
import { EventService } from 'src/app/services/event.service';
import { of, throwError } from 'rxjs';
import { Event } from 'src/app/models/Event';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;
  let eventService:EventService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [WishlistComponent,HeaderComponent,FooterComponent],
      imports:[HttpClientTestingModule,MatToolbarModule,MatIconModule],
      providers: [EventService]
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    eventService = TestBed.inject(EventService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch wishlisted events', () => {
    const mockEvents: Event[] = [{
      id: 385127,
      title: "Eiffel Tower ",
      type: "family",
      username:"ramya",
      venue: {id: 3626,name: "Le Theatre Des Arts",state: "NV"},
      performers: [{id: 915759,type: "theater_family",name: "Eiffel Tower De"}]
    }];
    spyOn(eventService,'getAllWishlistedEvents').and.returnValue(of(mockEvents));
    component.viewWishlistedEvents();
    expect(component.events).toEqual(mockEvents);
  });

  it('should delete a wishlisted event', () => {
    const id =385127;
      spyOn(eventService, 'deleteWishlistedEvent').and.returnValue(of({}));
      component.deleteWishlistedEvent(id);
  });
});
