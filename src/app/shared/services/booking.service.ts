import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateBookingRequest } from '../models/create-booking-request';
import { RoomBooking } from '../models/room-booking';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  public getBookingsForAccount(accountId: number) {
    let params = new HttpParams().set('accountId', accountId.toString());

    return this.http.get<Array<RoomBooking>>(
      `${this.configService.apiBaseUrl}/roombooking/GetRoomBookingsForAccount`,
      { params: params }
    );
  }

  // Creates a booking with the details in the given request
  public createBooking(request: CreateBookingRequest): Observable<string> {
    return this.http.post<string>(
      `${this.configService.apiBaseUrl}/roombooking/CreateBooking`,
      request
    );
  }
}
