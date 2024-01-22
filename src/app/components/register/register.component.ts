import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userForm!:FormGroup;
  user!:User;

  constructor(private userService: UserService,private router:Router,private formBuilder:FormBuilder) { }
  ngOnInit(){
    this.userForm = this.formBuilder.group({
      username: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9]+$')]],
      email:['', [Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(8),
      Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,12}$')]],
      phoneNumber:['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    });
  }
  
  register(){
    if(this.userForm.valid){
      const user: User = { username: this.userForm.get('username')!.value || '', 
      email: this.userForm.get('email')!.value || '', 
      phoneNumber: this.userForm.get('phoneNumber')!.value || '',
      password: this.userForm.get('password')!.value || '',
    };
    this.userService.registerUser(user).subscribe(
      (data:any)=>{
        //sucess
        this.user=data;
        console.log(data);
        Swal.fire('Success','Registered Sucessfully!','success');
        this.router.navigate(['login']);
      },
      (error)=>{
        //failure
        console.log(error.error);
        Swal.fire('','Username is already taken try using different username','info');

      });
    }
  }
}
