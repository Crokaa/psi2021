import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseUploadComponent } from './choose-upload.component';

describe('ChooseUploadComponent', () => {
  let component: ChooseUploadComponent;
  let fixture: ComponentFixture<ChooseUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
