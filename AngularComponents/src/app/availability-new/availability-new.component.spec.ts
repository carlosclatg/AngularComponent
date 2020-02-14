import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityNewComponent } from './availability-new.component';

describe('AvailabilityNewComponent', () => {
  let component: AvailabilityNewComponent;
  let fixture: ComponentFixture<AvailabilityNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailabilityNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
