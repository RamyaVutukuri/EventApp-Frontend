import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public userService:UserService, public authService:AuthService, private router:Router){}
  ngOnInit(){}
  login(){
    this.router.navigate(['/login']);
  }
  registerUser(){
    this.router.navigate(['/register']);
  }
}
