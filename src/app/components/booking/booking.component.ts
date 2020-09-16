import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Room } from 'src/app/shared/models/room';
import { RoomBooking } from 'src/app/shared/models/room-booking';
import { RoomService } from 'src/app/shared/services/room.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  @Input() booking: RoomBooking;

  constructor(private roomService: RoomService) {}

  // The room for which this booking is for
  private _room: Room;

  get room() {
    return this._room;
  }

  // Get the url of the image to display in the summary
  get imageUrl(): string {
    if (this.room && this.room.roomImages && this.room.roomImages.length > 0) {
      return this.room.roomImages[0].imageUrl;
    } else {
      return null;
    }
  }

  ngOnInit(): void {
    // Get the room accociated with this booking - cached data is ok
    this.roomService.getRoom(this.booking.roomId, false).subscribe((room) => {
      this._room = room;
    });
  }

  formatDate(date: Date): string {
    return moment(date).format('DD/MM/YYYY');
  }
}
