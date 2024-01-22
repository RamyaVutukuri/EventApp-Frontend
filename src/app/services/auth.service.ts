import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../models/UserInfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient) { }

  AUTH_URL : string = 'http://localhost:8082/api/v1';

  login(userInfo : UserInfo) : Observable<any> {
    return this.httpClient.post(this.AUTH_URL+"/login",userInfo);
  }
}
