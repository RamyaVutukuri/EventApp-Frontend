import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService:AuthService,private router:Router){}
  token:any;
  username!:String;
  public user = {
    username: '',
    password:''
  }
  
  ngOnInit():void {}
  login(){
    if(this.user.username == ''|| this.user.username == null){
      // alert("Enter Username !");
      Swal.fire('','UserName is required !','info');
    }
    if(this.user.password == ''|| this.user.password == null){
      // alert("Enter password !");
      Swal.fire('','Password is required !','info');
    } 
    else {
    this.authService.login(this.user).subscribe(
      (data:any)=>{
        this.token=data.token;
        this.username=this.user.username;
        console.log(this.username);
        console.log(data);
        sessionStorage.setItem('Username',JSON.stringify(this.user.username));
        sessionStorage.setItem("token",data.token);
        this.router.navigate(['events']);
        console.log(data.token);
      },
      (error)=>{
        //failure
        console.log(error);
        Swal.fire('','Invalid Credentials!','info');
        }
      );
    }
  }
}
