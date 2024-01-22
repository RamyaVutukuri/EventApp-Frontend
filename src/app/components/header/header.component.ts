import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public userService:UserService,private router:Router){}
  ngOnInit():void {}
  
  getLoginStatus(){
    if(sessionStorage.getItem("Username") && sessionStorage.getItem("token")){
      return true;
    }
    else {
      return false;
    }
  }

  logout(){
    sessionStorage.removeItem("Username");
    sessionStorage.removeItem("token");
    this.router.navigate(['/home'])
  }
}
