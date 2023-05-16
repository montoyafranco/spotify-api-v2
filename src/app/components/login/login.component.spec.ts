import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { throwError, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let requestService: RequestService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        RequestService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    requestService = TestBed.inject(RequestService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display success alert on successful login', () => {
    spyOn(requestService, 'login').and.returnValue(of('fakeToken'));
    spyOn(localStorage, 'setItem');
    
    spyOn(router, 'navigate');

    component.username = 'admin';
    component.password = 'root';
    component.onSubmit();

    expect(requestService.login).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fakeToken');
   
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should display error alert on failed login', () => {
    spyOn(requestService, 'login').and.returnValue(throwError('Fake error'));
    spyOn(console, 'error');
    

    component.username = 'admin';
    component.password = 'wrongPassword';
    component.onSubmit();

    expect(requestService.login).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Fake error');
   
  });
});
