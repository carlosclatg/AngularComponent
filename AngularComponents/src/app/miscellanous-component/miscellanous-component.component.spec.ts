import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellanousComponentComponent } from './miscellanous-component.component';

describe('MiscellanousComponentComponent', () => {
  let component: MiscellanousComponentComponent;
  let fixture: ComponentFixture<MiscellanousComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellanousComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellanousComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
