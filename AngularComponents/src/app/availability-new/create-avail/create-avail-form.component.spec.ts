import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAvailFormComponent } from './create-avail-form.component';

describe('CreateAvailComponent', () => {
  let component: CreateAvailFormComponent;
  let fixture: ComponentFixture<CreateAvailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAvailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAvailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
