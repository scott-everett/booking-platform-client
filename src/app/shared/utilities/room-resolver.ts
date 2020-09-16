import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';

@Injectable()
export class RoomResolver implements Resolve<Observable<Room>> {
  constructor(private roomService: RoomService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Room> {
    // By default, used cached data if it's available
    let refresh = false;

    if (route.params.refresh) {
      // Set the refresh value to what is in the route params
      refresh = route.params.refresh;
    }

    const id = parseInt(route.params.id);

    return this.roomService.getRoom(id, refresh).pipe(take(1));
  }
}
