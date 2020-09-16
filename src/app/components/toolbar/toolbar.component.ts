import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Account } from 'src/app/shared/models/account';
import { AccountService } from 'src/app/shared/services/account.service';
import {
  AccountDialogComponent,
  AccountDialogComponentMode,
} from '../dialogs/account-dialog/account-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  constructor(
    private matDialog: MatDialog,
    public accountService: AccountService,
    private router: Router
  ) {}

  // Logged in account
  get currentAccount(): Account {
    return this.accountService.currentAccount;
  }

  // We should not show rooms list link if we are already viewing them
  get doShowRoomsListLink(): boolean {
    return !(this.router.url === '/rooms');
  }

  // Returns true when the attempt to load account data
  // from local storage has finished
  get accountLoadAttempted(): boolean {
    return this.accountService.accountLoadAttempted;
  }

  ngOnInit(): void {}

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

  // Link to booking list
  onBookingListClick() {
    this.router.navigate([
      `/account/${this.accountService.currentAccount.accountId}/bookings`,
    ]);
  }

  onSignOutClick() {
    // Log the user out
    this.accountService.signOut();
  }
}
