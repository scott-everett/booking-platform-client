import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateBookingRequest } from 'src/app/shared/models/create-booking-request';
import { Room } from 'src/app/shared/models/room';
import { AccountService } from 'src/app/shared/services/account.service';
import { BookingService } from 'src/app/shared/services/booking.service';
import { ConfigService } from 'src/app/shared/services/config.service';
import { BookingParametersComponent } from '../booking-parameters/booking-parameters.component';
import {
  AccountDialogComponent,
  AccountDialogComponentMode,
} from '../dialogs/account-dialog/account-dialog.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  @ViewChild('bookingParameters') bookingParameters: BookingParametersComponent;

  constructor(
    private accountService: AccountService,
    private bookingService: BookingService,
    private snackBar: MatSnackBar,
    private configService: ConfigService,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Room to display in this component
  _room: Room;

  get room(): Room {
    return this._room;
  }

  // Set this field to true when we are waiting on the server to
  // disable the 'Book Now' button
  public waitingForServer = false;

  // Get the urls of the images to display in the carousel
  get imageUrls(): Array<string> {
    if (this.room && this.room.roomImages && this.room.roomImages.length > 0) {
      return this.room.roomImages.map((ri) => ri.imageUrl);
    } else {
      return null;
    }
  }

  // Create a dummy array with the same number of elements as capacity to
  // generate the correct amount of person icons
  get guestArrayToGenerateCapacityIcons(): Array<any> {
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

  // The 'Book Now' button is only visible when the booking
  // parameters pass validation
  get bookNowButtonDisabled(): boolean {
    if (!this.bookingParameters) {
      return true;
    }

    return !this.bookingParameters.valid;
  }

  // Logged in account
  get isLoggedIn(): boolean {
    return this.accountService.currentAccount !== null;
  }

  ngOnInit(): void {
    // Get the room that was fetched by the resolver
    this.route.data.subscribe((data) => {
      this._room = data.room;
    });
  }

  // Creates a booking
  onBookClick() {
    // Disable and put a spinner on the action button
    this.waitingForServer = true;

    // Build the request from info on the form
    const request = new CreateBookingRequest();
    request.roomId = this.room.roomId;
    request.accountId = this.accountService.currentAccount.accountId;
    request.startDate = this.bookingParameters.bookingStartDate;
    request.endDate = this.bookingParameters.bookingEndDate;
    request.personCount = this.bookingParameters.noOfGuests;

    // Make the request to the server
    this.bookingService.createBooking(request).subscribe(
      () => {
        // Registration was successful
        this.waitingForServer = false;

        // Notify the user of the error
        this.snackBar.open('Your booking was successful!  Thank you!', null, {
          panelClass: ['success-snackbar'],
          duration: this.configService.snackBarDisplayTime,
        });

        // Navigate to the bookings list
        this.router.navigate([
          `/account/${this.accountService.currentAccount.accountId}/bookings`,
        ]);
      },
      (error) => {
        this.waitingForServer = false;

        // An error was encountered...
        var message =
          'Sorry! An error occurred when attempting to make your booking!';

        if (error && error.error) {
          switch (error.error) {
            case 'RoomNotAvailableException': {
              message =
                'Unfortunately the room is not available for the dates requested!';
              break;
            }
            case 'RoomCapacityInsufficentException': {
              message =
                'The room does not cater for the number of guests that you requested!';
              break;
            }
          }
        }

        // Notify the user of the error
        this.snackBar.open(message, null, {
          panelClass: ['warning-snackbar'],
          duration: this.configService.snackBarDisplayTime,
        });
      }
    );
  }

  onRegisterClick() {
    // Show an account registration dialog
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = AccountDialogComponentMode.Register;
    this.matDialog.open(AccountDialogComponent, dialogConfig);
  }

  onSignInClick() {
    // Show an account sign in dialog
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = AccountDialogComponentMode.SignIn;
    this.matDialog.open(AccountDialogComponent, dialogConfig);
  }
}
