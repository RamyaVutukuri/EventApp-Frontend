import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/Event';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  constructor(private eventService: EventService, private router: Router) { }
  events:Event[]=[];
  event!:Event;

  ngOnInit() : void{
    this.getEvents();
   }
  
  getEvents(){
    this.eventService.getAllEvents().subscribe(
    (data:any)=>{
      this.events=data.events;
      console.log(data);
      console.log(data.events);  
    },
    (error) => {
      console.log(error)
    }
  )
  }

  addToWishlist(event:Event){
    console.log(sessionStorage.getItem('Username'));
    const username=sessionStorage.getItem('Username');
    event.username=username?JSON.parse(username):null;
    console.log(event.username);
    this.eventService.addEventToWishlist(event).subscribe(
      (data:any)=>{
        this.event=data;
        console.log(this.event);
        Swal.fire('Success','Event added to wishlist','success');
      },
      (error)=>{
        console.log(error.error);
        Swal.fire('','Event already present in wishlist','info');
      }
    )
  }

  getEventImage(type:string):string {
 
    switch (type) {
 
      case 'comedy':
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThs603OC9M7kwUutb9UzUnfLy9VdaLIdVJ5A&usqp=CAU';
 
      case 'family':
        return 'https://png.pngtree.com/png-vector/20190120/ourlarge/pngtree-celebrate-family-gathering-end-of-exam-gift-png-image_495094.jpg';
 
      case 'sports':
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRA15L6oghHHAmBHHYNffXdS1wTk5f8l1NiA&usqp=CAU';
 
      case 'concert':
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwCEc8HrFrGeZZu1LR5rO4a_o-nO_fm7BkAg&usqp=CAU';
 
      case 'theater':
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiji3JJZGPw101D-5q3RmkcVzH_dgUGl6rYA&usqp=CAU';
 
      case 'ncaa_womens_basketball':
        return 'https://thelivenagpur.com/wp-content/uploads/2019/02/basketball-tourny.jpg';
 
      case 'dance_performance_tour':
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD-e4d_TnMxA6pu4vvPQcaiPVOByIcbbq6HQ&usqp=CAU';
 
      default:
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwCEc8HrFrGeZZu1LR5rO4a_o-nO_fm7BkAg&usqp=CAU';
    }
  }
}

