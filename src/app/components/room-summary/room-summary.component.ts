import { Component, Input, OnInit } from '@angular/core';
import { Room } from 'src/app/shared/models/room';

@Component({
  selector: 'app-room-summary',
  templateUrl: './room-summary.component.html',
  styleUrls: ['./room-summary.component.css'],
})
export class RoomSummaryComponent implements OnInit {
  @Input() room: Room;

  constructor() {}

  // Get the url of the image to display in the summary
  get imageUrl(): string {
    if (this.room && this.room.roomImages && this.room.roomImages.length > 0) {
      return this.room.roomImages[0].imageUrl;
    } else {
      return null;
    }
  }

  // Get the first line of the full room description
  get roomDescription(): string {
    if (this.room && this.room.description) {
      const matches = RegExp('^(.*?)[.?!][\\s\\n{\\r\\n}]').exec(
        this.room.description
      );
      if (matches.length > 0) {
        return matches[0];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  // Create a dummy array with the same number of elements as capacity to
  // generate the correct amount of person icons
  get guestArrayToGenerateCapacityIcons() {
    if (
      this.room &&
      this.room.capacity &&
      this.room.capacity > 0 &&
      this.room.capacity <= 10
    ) {
      return [].constructor(this.room.capacity);
    } else {
      return [];
    }
  }

  ngOnInit(): void {}
}
