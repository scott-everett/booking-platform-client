import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomBooking } from 'src/app/shared/models/room-booking';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css'],
})
export class BookingListComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  // List of rooms to display in this component
  _bookings: Array<RoomBooking>;

  get bookings(): Array<RoomBooking> {
    return this._bookings;
  }

  ngOnInit(): void {
    // Get the bookings that were fetched by the resolver
    this.route.data.subscribe((data) => {
      this._bookings = data.bookings;
    });
  }
}
