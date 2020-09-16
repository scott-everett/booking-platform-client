import { AbstractControl } from '@angular/forms';

// Test the control holds a string with a valid email address format
export function emailAddressValidator(control: AbstractControl) {
  const value = control.value == null ? '' : (control.value as string);
  if (!RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$').test(value)) {
    return { invalidEmailAddress: 'Invalid email address!' };
  }
  return null;
}
