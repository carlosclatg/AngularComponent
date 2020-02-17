import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProgramAvailComponent } from './client-program-avail.component';

describe('ClientProgramAvailComponent', () => {
  let component: ClientProgramAvailComponent;
  let fixture: ComponentFixture<ClientProgramAvailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientProgramAvailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProgramAvailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
