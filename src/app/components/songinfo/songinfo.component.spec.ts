import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonginfoComponent } from './songinfo.component';

describe('SonginfoComponent', () => {
  let component: SonginfoComponent;
  let fixture: ComponentFixture<SonginfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonginfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SonginfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
