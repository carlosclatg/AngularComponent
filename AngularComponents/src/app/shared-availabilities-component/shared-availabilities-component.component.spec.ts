import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedAvailabilitiesComponentComponent } from './shared-availabilities-component.component';

describe('SharedAvailabilitiesComponentComponent', () => {
  let component: SharedAvailabilitiesComponentComponent;
  let fixture: ComponentFixture<SharedAvailabilitiesComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedAvailabilitiesComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedAvailabilitiesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
