export class CreateBookingRequest {
  public roomId: number;
  public accountId: number;
  public startDate: Date;
  public endDate: Date;
  public personCount: number;
}
