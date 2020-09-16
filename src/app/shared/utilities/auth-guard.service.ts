import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  AccountDialogComponent,
  AccountDialogComponentMode,
} from 'src/app/components/dialogs/account-dialog/account-dialog.component';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private dialog: MatDialog,
    private accountService: AccountService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // Get the account details
    // If the user is not logged in then show the sign in dialog
    return this.accountService.currentAccountAsync.pipe(
      switchMap((account) => (account ? of(true) : this.openDialog()))
    );
  }

  openDialog(): Observable<boolean> {
    // Show an account sign in dialog
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = AccountDialogComponentMode.SignIn;
    const dialogRef = this.dialog.open(AccountDialogComponent, dialogConfig);

    // Check to see if the user logged in afterwards
    return dialogRef.afterClosed().pipe(
      switchMap(() =>
        this.accountService.currentAccountAsync.pipe(
          map((account) => (account ? true : false)),
          tap((canActivate) => {
            if (!canActivate) {
              // Redirect to the rooms list if we can not activate this route
              this.router.navigate(['/rooms']);
            }
          })
        )
      )
    );
  }
}
