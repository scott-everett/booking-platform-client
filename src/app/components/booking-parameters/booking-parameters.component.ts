import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { endDateOnOrBeforeStartDate } from 'src/app/shared/validators/end-date-on-or-before-start-date';

@Component({
  selector: 'app-booking-parameters',
  templateUrl: './booking-parameters.component.html',
  styleUrls: ['./booking-parameters.component.css'],
})
export class BookingParametersComponent implements OnInit {
  public bookingParametersForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Set up the reactive form
    this.bookingParametersForm = fb.group({
      bookingDates: fb.group(
        {
          bookingStartDate: ['', Validators.required],
          bookingEndDate: ['', Validators.required],
        },
        {
          validator: endDateOnOrBeforeStartDate(
            'bookingStartDate',
            'bookingEndDate'
          ),
        }
      ),
      noOfGuests: ['', Validators.required],
    });
  }

  get bookingStartDate() {
    return this.bookingParametersForm.get('bookingDates.bookingStartDate')
      .value;
  }

  get bookingEndDate() {
    return this.bookingParametersForm.get('bookingDates.bookingEndDate').value;
  }

  get noOfGuests() {
    return this.bookingParametersForm.get('noOfGuests').value;
  }

  get valid(): boolean {
    return this.bookingParametersForm.valid;
  }

  ngOnInit(): void {}

  // Filters dates from the date range mat date picker
  filterValidBookingDates = (m: moment.Moment | null): boolean => {
    return (m || moment()).startOf('day') >= moment().startOf('day');
  };
}
