import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/User";
import { HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })  
export class UserService {
    constructor(private httpClient : HttpClient) { 
    }

    USER_URL : string = 'http://localhost:8081/api/v1/user';
    username=sessionStorage.getItem('Username');
    user=this.username?JSON.parse(this.username):null;

    registerUser(user : User) : Observable<User> {
        return this.httpClient.post<User>(this.USER_URL,user);
    }

    updateUser(user:User) : Observable<User>{
        return this.httpClient.put<User>(this.USER_URL+"/updateUser",user);
    }

    viewUser() : Observable<User> {
        return this.httpClient.get<User>(this.USER_URL+"/"+this.user);
    }
}
