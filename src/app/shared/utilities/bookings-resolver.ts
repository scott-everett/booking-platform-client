import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs-compat';
import { RoomBooking } from '../models/room-booking';
import { BookingService } from '../services/booking.service';

@Injectable()
export class BookingsResolver {
  constructor(private bookingService: BookingService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<RoomBooking>> {
    const id = parseInt(route.params.id);
    return this.bookingService.getBookingsForAccount(id);
  }
}
