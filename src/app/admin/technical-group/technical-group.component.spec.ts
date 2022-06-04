import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalGroupComponent } from './technical-group.component';

describe('TechnicalGroupComponent', () => {
  let component: TechnicalGroupComponent;
  let fixture: ComponentFixture<TechnicalGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
