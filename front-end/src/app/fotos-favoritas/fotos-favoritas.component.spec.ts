import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotosFavoritasComponent } from './fotos-favoritas.component';

describe('FotosFavoritasComponent', () => {
  let component: FotosFavoritasComponent;
  let fixture: ComponentFixture<FotosFavoritasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotosFavoritasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FotosFavoritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
