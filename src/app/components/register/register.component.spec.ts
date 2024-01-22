import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from './register.component';
import { UserService } from 'src/app/services/user.service';
import { of, throwError } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FooterComponent } from '../footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from '../login/login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from 'src/app/models/User';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService:jasmine.SpyObj<UserService>;

  const userData:User = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'Test@1234',
    phoneNumber: '1234567890'
  };

  beforeEach(async() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['registerUser']);
    TestBed.configureTestingModule({
      declarations: [RegisterComponent,HeaderComponent,FooterComponent],
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([{path:'login',component:LoginComponent}]),
      MatCardModule,MatButtonModule,MatInputModule, MatToolbarModule,
      MatFormFieldModule,HttpClientTestingModule,FormsModule,BrowserAnimationsModule],
      providers: [{ provide: UserService, useValue: userServiceSpy }]
    })
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the registration form', () => {
    expect(component.userForm).toBeDefined();
  });


  it('should registrater user', () => {
    component.user=userData
    userService.registerUser.and.returnValue(of(userData));
    component.userForm.setValue(userData);
    component.register();
    expect(userService.registerUser).toHaveBeenCalledWith(userData);
  })
    

  it('should handle registration failure', () => {
    component.user=userData;
    const errorResponse = { error: 'User already exists with given username' };
    userService.registerUser.and.returnValue(throwError(errorResponse));
    component.userForm.setValue(userData);
    component.register();
    expect(userService.registerUser).toHaveBeenCalledWith(userData);
  });
});
