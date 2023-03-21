import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoDetailsComponent } from './foto-details.component';

describe('FotoDetailsComponent', () => {
  let component: FotoDetailsComponent;
  let fixture: ComponentFixture<FotoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotoDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
