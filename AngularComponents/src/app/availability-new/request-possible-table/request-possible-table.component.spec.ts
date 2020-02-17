import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPossibleTableComponent } from './request-possible-table.component';

describe('RequestPossibleTableComponent', () => {
  let component: RequestPossibleTableComponent;
  let fixture: ComponentFixture<RequestPossibleTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPossibleTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPossibleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
