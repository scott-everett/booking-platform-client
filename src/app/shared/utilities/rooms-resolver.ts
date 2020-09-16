import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';

@Injectable()
export class RoomsResolver implements Resolve<Observable<Array<Room>>> {
  constructor(private roomService: RoomService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<Room>> {
    // By default, used cached data if it's available
    let refresh = false;

    if (route.params.refresh) {
      // Set the refresh value to what is in the route params
      refresh = route.params.refresh;
    }

    return this.roomService.getRooms(refresh).pipe(take(1));
  }
}
