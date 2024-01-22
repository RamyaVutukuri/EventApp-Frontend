import { TestBed,inject} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { UserInfo } from '../models/UserInfo';


describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should send login request', () => {
    const dummyUserInfo: UserInfo = {
        username:"user",
        password:"user@123"
    };
    authService.login(dummyUserInfo).subscribe((response) => {
        expect(response).toBeTruthy();
    });

    const request = httpMock.expectOne('http://localhost:8082/api/v1/login');
    expect(request.request.method).toBe('POST');

    request.flush({});
  });
});

