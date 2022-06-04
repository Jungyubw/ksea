import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGnbComponent } from './admin-gnb.component';

describe('AdminGnbComponent', () => {
  let component: AdminGnbComponent;
  let fixture: ComponentFixture<AdminGnbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGnbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGnbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
