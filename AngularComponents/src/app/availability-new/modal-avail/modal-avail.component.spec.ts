import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAvailComponent } from './modal-avail.component';

describe('ModalAvailComponent', () => {
  let component: ModalAvailComponent;
  let fixture: ComponentFixture<ModalAvailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAvailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAvailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
