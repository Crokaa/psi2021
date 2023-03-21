import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotosRecentesComponent } from './fotos-recentes.component';

describe('FotosRecentesComponent', () => {
  let component: FotosRecentesComponent;
  let fixture: ComponentFixture<FotosRecentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotosRecentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FotosRecentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
