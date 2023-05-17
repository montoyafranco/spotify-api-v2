// register.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { HttpClientModule } from '@angular/common/http';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule,HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  }); 
  it('should show error alert if password is too short', () => {
    // Arrange
    const passwordInput: HTMLInputElement = fixture.nativeElement.querySelector('#exampleInputPassword1');
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    const errorTitle = 'Oops...';
    const errorMessage = 'Asegúrate de que tu contraseña tenga una longitud superior a 4!';

    
  
    // Act
    passwordInput.value = '123'; // Establece una contraseña demasiado corta
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    submitButton.click();
    fixture.detectChanges();
  
    // Assert
    expect(component.isFormSubmitted).toBe(true);
    expect(component.isFormValid).toBe(true); 
    
    
  });
  

  it('should call onSubmit method with valid form data', () => {
    const usernameInput: HTMLInputElement = fixture.nativeElement.querySelector('#exampleInputEmail1');
    const passwordInput: HTMLInputElement = fixture.nativeElement.querySelector('#exampleInputPassword1');
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');

    // Set valid values
    usernameInput.value = 'username';
    passwordInput.value = 'password';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    spyOn(component, 'onSubmit').and.callThrough();

    submitButton.click();
    fixture.detectChanges();

    expect(component.onSubmit).toHaveBeenCalled();
  });
});
