// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { RegisterComponent } from './register.component';

// describe('RegisterComponent', () => {
//   let component: RegisterComponent;
//   let fixture: ComponentFixture<RegisterComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ RegisterComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(RegisterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';
import { User } from 'src/app/interfaces/Models';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let requestServiceSpy: jasmine.SpyObj<RequestService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const requestSpy = jasmine.createSpyObj('RequestService', ['createUser']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [RegisterComponent],
      providers: [
        { provide: RequestService, useValue: requestSpy },
        { provide: Router, useValue: routerSpyObj }
      ]
    }).compileComponents();

    requestServiceSpy = TestBed.inject(RequestService) as jasmine.SpyObj<RequestService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error alert if username and/or password are too short', () => {
    const form = new NgForm([], []);
    component.username = 'abc';
    component.password = '123';
    component.onSubmit(form);
    expect(component.isFormValid).toBe(false);
    expect(component.showErrorAlert).toHaveBeenCalledWith('Oops...', 'Asegúrate de que tu username y contraseña tengan una longitud superior a 4!');
  });

  it('should show error alert if createUser() fails', waitForAsync(() => {
    const form = new NgForm([], []);
    component.username = 'validusername';
    component.password = 'validpassword';
    const errorResponse = { error: { message: 'User already exists' } };
    requestServiceSpy.createUser.and.returnValue(throwError(errorResponse));

    component.onSubmit(form);

    fixture.whenStable().then(() => {
      expect(component.showErrorAlert).toHaveBeenCalledWith('Oops...', 'Prueba con otro usuario !');
    });
  }));

  it('should create user and show success alert if createUser() succeeds', waitForAsync(() => {
    const form = new NgForm([], []);
    component.username = 'validusername';
    component.password = 'validpassword';
    const user: User = { username: component.username, password: component.password };
    requestServiceSpy.createUser.and.returnValue(of(user));
  
    spyOn(component, 'showSuccessAlert').and.callThrough(); // Espiar el método showSuccessAlert
  
    routerSpy.navigateByUrl.calls.reset(); // Reiniciar el espía de navigateByUrl
  
    const navigateByUrlSpy = spyOn(routerSpy, 'navigateByUrl'); // Espiar el método navigateByUrl nuevamente
  
    component.onSubmit(form);
  
    fixture.whenStable().then(() => {
      expect(component.showSuccessAlert).toHaveBeenCalledWith('Seras redirigido a Login ');
      expect(navigateByUrlSpy).toHaveBeenCalledWith('/login');
    });
  }));
  
}
);

