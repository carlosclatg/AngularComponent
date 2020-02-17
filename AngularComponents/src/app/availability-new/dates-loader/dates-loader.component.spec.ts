import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesLoaderComponent } from './dates-loader.component';

describe('DatesLoaderComponent', () => {
  let component: DatesLoaderComponent;
  let fixture: ComponentFixture<DatesLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatesLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatesLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
