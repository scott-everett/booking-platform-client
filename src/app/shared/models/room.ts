import { RoomImage } from './room-image';

export class Room {
  public roomId: number;
  public title: string;
  public description: string;
  public address: string;
  public summaryLocation: string; // Location to be displayed on summary info
  public capacity: number;
  public price: number;
  public roomImages: Array<RoomImage>;
}
