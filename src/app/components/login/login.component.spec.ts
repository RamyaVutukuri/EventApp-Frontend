import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authSpy=jasmine.createSpyObj('Authservice',['login']);
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent,HeaderComponent,FooterComponent ],
      imports:[HttpClientTestingModule,MatCardModule,MatButtonModule,
        MatInputModule,FormsModule,
        MatFormFieldModule,MatToolbarModule,MatIconModule,
        BrowserAnimationsModule,RouterTestingModule],
      providers:[{provide:AuthService,userValue:authSpy}]
    }).compileComponents();
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });  
  
  it('should login a user', () => {
    const mockCredentials = { username: 'testuser', password: 'testpassword' };
    const loginSpy = spyOn(authService, 'login').and.callThrough();
    component.user = mockCredentials;
    component.login();
    expect(loginSpy).toHaveBeenCalledWith(mockCredentials);
  });
});
