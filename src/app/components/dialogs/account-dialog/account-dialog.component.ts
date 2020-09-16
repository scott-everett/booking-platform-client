import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthenticateAccountRequest } from 'src/app/shared/models/authenticate-account-request';
import { RegisterAccountRequest } from 'src/app/shared/models/register-account-request';
import { AccountService } from 'src/app/shared/services/account.service';
import { ConfigService } from 'src/app/shared/services/config.service';
import { emailAddressValidator } from 'src/app/shared/validators/email-address-validator';
import { fieldMatchValidator } from '../../../shared/validators/field-match-validator';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.css'],
})
export class AccountDialogComponent implements OnInit {
  private mode: AccountDialogComponentMode;

  public AccountDialogComponentMode = AccountDialogComponentMode;

  // Reactive forms
  public registerForm: FormGroup;
  public signInForm: FormGroup;

  // Message when 'required' validation fails
  public requiredErrorMessage = 'This field is required!';

  // Message when password confirmation validation fails
  public passwordsNotMatchedMessage = 'Password confirmation must match!';

  // Hides the text in the password fields when this is set to true
  public hidePassword = true;

  // Set this field to true when we are waiting on the server to
  // disable the 'Register' and 'Sign In' buttons
  public waitingForServer = false;

  // Store the 'Register' or 'Sign In' request subscriptions so that
  // we can cancel them if necessary (eg. mode change)
  public requestSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<AccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public startMode: AccountDialogComponentMode,
    private fb: FormBuilder,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private configService: ConfigService
  ) {
    // Set up the reactive forms
    this.registerForm = fb.group({
      name: ['', Validators.required],
      emailAddress: ['', [Validators.required, emailAddressValidator]],
      matchingPassword: fb.group(
        {
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required],
        },
        { validator: fieldMatchValidator('password', 'confirmPassword') }
      ),
    });

    this.signInForm = fb.group({
      emailAddress: ['', [Validators.required, emailAddressValidator]],
      password: ['', Validators.required],
    });
  }

  get changeModeLinkText(): string {
    switch (this.mode) {
      case AccountDialogComponentMode.Register: {
        return 'Sign In';
        break;
      }
      case AccountDialogComponentMode.SignIn: {
        return 'Register';
        break;
      }
    }
  }

  get modeText(): string {
    switch (this.mode) {
      case AccountDialogComponentMode.Register: {
        return 'Register';
        break;
      }
      case AccountDialogComponentMode.SignIn: {
        return 'Sign In';
        break;
      }
    }
  }

  get reactiveForm(): FormGroup {
    switch (this.mode) {
      case AccountDialogComponentMode.Register: {
        return this.registerForm;
        break;
      }
      case AccountDialogComponentMode.SignIn: {
        return this.signInForm;
        break;
      }
    }
  }

  // Validation error message for the active email address field
  get emailAddressErrorMessage(): string {
    const emailAddress = this.reactiveForm.get('emailAddress');

    if (!emailAddress.touched) {
      return null;
    }

    if (emailAddress.hasError('required')) {
      return this.requiredErrorMessage;
    }

    if (emailAddress.hasError('invalidEmailAddress')) {
      return emailAddress.errors['invalidEmailAddress'];
    }

    return null;
  }

  // Determines whether the 'Register' or 'Sign In' button (depending on mode)
  // is disabled or not
  get goButtonDisabled(): boolean {
    switch (this.mode) {
      case AccountDialogComponentMode.Register: {
        return !this.registerForm.valid || this.waitingForServer;
        break;
      }
      case AccountDialogComponentMode.SignIn: {
        return !this.signInForm.valid || this.waitingForServer;
        break;
      }
    }
    return true;
  }

  ngOnInit(): void {
    this.mode = this.startMode;
  }

  isInMode(mode: AccountDialogComponentMode): boolean {
    return mode === this.mode;
  }

  // Toggles between registering and signing in
  toggleMode() {
    // Unsubscribe from any running server requests
    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
    }

    switch (this.mode) {
      case AccountDialogComponentMode.Register: {
        this.mode = AccountDialogComponentMode.SignIn;
        break;
      }
      case AccountDialogComponentMode.SignIn: {
        this.mode = AccountDialogComponentMode.Register;
        break;
      }
    }
  }

  // Handler for when the 'Register' or 'Sign In' button (depending on mode)
  // is clicked - performs the action
  onGoClick() {
    // Disable and put a spinner on the action button
    this.waitingForServer = true;

    switch (this.mode) {
      case AccountDialogComponentMode.Register: {
        // Build the request from info on the form
        const request = new RegisterAccountRequest({
          userFullName: this.registerForm.get('name').value,
          emailAddress: this.registerForm.get('emailAddress').value,
          password: this.registerForm.get('matchingPassword.password').value,
        });

        // Make the request to the server
        this.requestSubscription = this.accountService
          .register(request)
          .subscribe(
            () => {
              // Registration was successful
              this.waitingForServer = false;

              // Notify the user of the error
              this.snackBar.open('Your registration was successful!', null, {
                panelClass: ['success-snackbar'],
                duration: this.configService.snackBarDisplayTime,
              });

              this.dialogRef.close();
            },
            (error) => {
              this.waitingForServer = false;

              // An error was encountered...
              var message =
                'Sorry! An error occurred when attempting to register your details!';

              if (error.error === 'AccountAlreadyExistsException') {
                message =
                  'An account already exists with the details that you have provided!';
              }

              // Notify the user of the error
              this.snackBar.open(message, null, {
                panelClass: ['warning-snackbar'],
                duration: this.configService.snackBarDisplayTime,
              });
            }
          );
        break;
      }
      case AccountDialogComponentMode.SignIn: {
        // Build the request from info on the form
        const request = new AuthenticateAccountRequest({
          emailAddress: this.signInForm.get('emailAddress').value,
          password: this.signInForm.get('password').value,
        });

        // Make the request to the server
        this.requestSubscription = this.accountService
          .signIn(request)
          .subscribe(
            (result) => {
              // Sign in was successful
              this.waitingForServer = false;

              // Notify the user of the error
              this.snackBar.open(
                `Welcome back ${result.userFullName} :)`,
                null,
                {
                  panelClass: ['success-snackbar'],
                  duration: this.configService.snackBarDisplayTime,
                }
              );

              this.dialogRef.close();
            },
            (error) => {
              this.waitingForServer = false;

              // An error was encountered...
              var message =
                'Sorry! An error occurred when attempting to sign you in!';

              if (error.error === 'AuthenticationFailedException') {
                message =
                  'The username and/or password that you provided are incorrect!';
              }

              // Notify the user of the error
              this.snackBar.open(message, null, {
                panelClass: ['warning-snackbar'],
                duration: this.configService.snackBarDisplayTime,
              });
            }
          );
        break;
      }
    }
  }

  onCancelClick() {
    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
    }

    this.dialogRef.close();
  }

  // Run the validator on the register confirm password field when the password field
  // has changed to check if the fields match
  onRegisterPasswordKeyUp() {
    this.registerForm
      .get('matchingPassword.confirmPassword')
      .updateValueAndValidity();
  }

  // Run the validator on the register password field when the confirm password field
  // has changed to check if the fields match
  onRegisterConfirmPasswordKeyUp() {
    this.registerForm.get('matchingPassword.password').updateValueAndValidity();
  }
}

export enum AccountDialogComponentMode {
  Register = 1,
  SignIn = 2,
}
