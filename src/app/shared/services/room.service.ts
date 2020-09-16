import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { RoomImage } from '../models/room-image';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';
import { Room } from '../models/room';
import { CreateBookingRequest } from '../models/create-booking-request';

@Injectable({
  providedIn: 'root',
})
export class RoomService implements OnDestroy {
  // Cache rooms in a replay subject
  private roomsSubject: ReplaySubject<Array<Room>>;
  private roomsRequest: Observable<Array<Room>>;
  private roomsSubscription: Subscription;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.roomsSubject = new ReplaySubject(1);
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    if (this.roomsSubscription) {
      this.roomsSubscription.unsubscribe();
    }
  }

  // The rooms list is sourced from a ReplaySubject that
  // may be refreshed if required
  public getRooms(refresh: boolean): Observable<Array<Room>> {
    if (refresh || !this.roomsRequest) {
      this.roomsRequest = this.http
        .get<Array<Room>>(`${this.configService.apiBaseUrl}/room/GetRooms`)
        .pipe(
          map((rooms) => {
            rooms.forEach((r) => {
              r.roomImages.forEach((ri) => {
                // Populate the ImageUrl field
                ri.imageUrl = `${this.configService.apiBaseUrl}/app-images/${ri.filename}`;
              });
              // Sort the array by image index
              r.roomImages = r.roomImages.sort(
                (a, b) => a.imageDex - b.imageDex
              );
            });
            return rooms;
          })
        );

      this.roomsRequest.subscribe(
        (result) => this.roomsSubject.next(result),
        (err) => this.roomsSubject.error(err)
      );
    }

    return this.roomsSubject.asObservable();
  }

  // The room is sourced for the room list ReplaySubject.  Setting refesh to
  // true will refresh this ReplaySubject.
  public getRoom(roomId: number, refresh: boolean): Observable<Room> {
    return this.getRooms(refresh).pipe(
      map((rooms) => {
        return rooms.find((r) => r.roomId === roomId);
      })
    );
  }
}
