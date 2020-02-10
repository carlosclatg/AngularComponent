import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceFormatComponentComponent } from './price-format-component.component';

describe('PriceFormatComponentComponent', () => {
  let component: PriceFormatComponentComponent;
  let fixture: ComponentFixture<PriceFormatComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceFormatComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceFormatComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
