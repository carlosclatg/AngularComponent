import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourInformationComponent } from './your-information.component';

describe('YourInformationComponent', () => {
  let component: YourInformationComponent;
  let fixture: ComponentFixture<YourInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
