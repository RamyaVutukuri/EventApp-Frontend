import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../models/Event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient : HttpClient) { }

  EVENT_URL : string = 'http://localhost:8083/api/v1/events';
  WISHLIST_URL : string = 'http://54.81.41.51:8084/api/v1/wishlist';
  
  username=sessionStorage.getItem('Username');
  user=this.username?JSON.parse(this.username):null;

  getAllEvents(){
    return this.httpClient.get<Event[]>(this.EVENT_URL);
  }

  addEventToWishlist(event:Event) : Observable<any> {
    return this.httpClient.post(this.WISHLIST_URL+'/addEvent/'+this.user,event,{"headers" : { "Authorization" : "Bearer " + sessionStorage.getItem('token')} });
  }

  getAllWishlistedEvents() : Observable<any> {

    return this.httpClient.get(this.WISHLIST_URL+'/'+this.user,{"headers" : { "Authorization" : "Bearer " + sessionStorage.getItem('token')} });
  }

  deleteWishlistedEvent(id:number) : Observable<any>{
    return this.httpClient.delete(this.WISHLIST_URL+'/deleteEvent/'+id+'/'+this.user,{"headers" : { "Authorization" : "Bearer " + sessionStorage.getItem('token')}, responseType: 'text' });
  }
}
