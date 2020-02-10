import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaymentComponentComponent } from './prepayment-component.component';

describe('PrepaymentComponentComponent', () => {
  let component: PrepaymentComponentComponent;
  let fixture: ComponentFixture<PrepaymentComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepaymentComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepaymentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
