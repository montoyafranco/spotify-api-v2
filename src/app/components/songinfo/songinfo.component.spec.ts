// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { SonginfoComponent } from './songinfo.component';

// describe('SonginfoComponent', () => {
//   let component: SonginfoComponent;
//   let fixture: ComponentFixture<SonginfoComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ SonginfoComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(SonginfoComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SonginfoComponent } from './songinfo.component';
import { RequestService } from 'src/app/services/request.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('SonginfoComponent', () => {
  let component: SonginfoComponent;
  let fixture: ComponentFixture<SonginfoComponent>;
  let mockActivatedRoute: any;
  let mockRequestService: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => 'sampleId',
        },
      },
    };

    mockRequestService = {
      getSong: () => of({}), // Mock the getSong method
      getUserRequest: () => of({}), // Mock the getUserRequest method
      addFavorite: () => of({}), // Mock the addFavorite method
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SonginfoComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: RequestService, useValue: mockRequestService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SonginfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
