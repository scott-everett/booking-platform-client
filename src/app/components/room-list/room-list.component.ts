import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/shared/models/room';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  // List of rooms to display in this component
  _rooms: Array<Room>;

  get rooms(): Array<Room> {
    return this._rooms;
  }

  ngOnInit(): void {
    // Get the rooms that were fetched by the resolver
    this.route.data.subscribe((data) => {
      this._rooms = data.rooms;
    });
  }
}
