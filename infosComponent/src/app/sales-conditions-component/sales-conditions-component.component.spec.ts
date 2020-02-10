import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesConditionsComponentComponent } from './sales-conditions-component.component';

describe('SalesConditionsComponentComponent', () => {
  let component: SalesConditionsComponentComponent;
  let fixture: ComponentFixture<SalesConditionsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesConditionsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesConditionsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
