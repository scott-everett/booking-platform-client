import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingParametersComponent } from './booking-parameters.component';

describe('BookingParametersComponent', () => {
  let component: BookingParametersComponent;
  let fixture: ComponentFixture<BookingParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
