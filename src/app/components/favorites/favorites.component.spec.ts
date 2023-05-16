import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { RequestService } from 'src/app/services/request.service';
import { of } from 'rxjs';
import { User } from 'src/app/interfaces/Models';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let requestServiceStub: Partial<RequestService>;

  beforeEach(async () => {
    requestServiceStub = {
      getUserRequest: () => of({ id: 1, username: 'testUser', password: 'testPassword' } as User),
      // Simular respuesta del servicio getUserRequest
      getCancionesFavoritas: () => of(['song1', 'song2']), // Simular respuesta del servicio getCancionesFavoritas
      getTracksByIds: () => of({ tracks: [{ id: 'track1' }, { id: 'track2' }] }) // Simular respuesta del servicio getTracksByIds
    };

    await TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      providers: [{ provide: RequestService, useValue: requestServiceStub }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Agrega más casos de prueba aquí...

});

