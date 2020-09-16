import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomComponent } from './components/room/room.component';
import { AuthGuardService } from './shared/utilities/auth-guard.service';
import { BookingsResolver } from './shared/utilities/bookings-resolver';
import { RoomResolver } from './shared/utilities/room-resolver';
import { RoomsResolver } from './shared/utilities/rooms-resolver';

const routes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  {
    path: 'rooms',
    component: RoomListComponent,
    // We always want to refresh the cached rooms list when viewing the rooms list
    data: { refresh: true },
    resolve: {
      rooms: RoomsResolver,
    },
  },
  {
    // id = roomId
    path: 'room/:id',
    component: RoomComponent,
    // Just use cached room data if it is available
    data: { refresh: false },
    resolve: {
      room: RoomResolver,
    },
  },
  {
    // id = accountId
    path: 'account/:id/bookings',
    component: BookingListComponent,
    resolve: {
      bookings: BookingsResolver,
    },
    canActivate: [AuthGuardService],
  },
  { path: '**', redirectTo: '/rooms', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RoomsResolver, RoomResolver, BookingsResolver, AuthGuardService],
})
export class AppRoutingModule {}
