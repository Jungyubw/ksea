import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardNoticeComponent } from './board-notice.component';

describe('BoardNoticeComponent', () => {
  let component: BoardNoticeComponent;
  let fixture: ComponentFixture<BoardNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
