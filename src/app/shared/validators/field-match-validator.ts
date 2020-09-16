import { FormGroup } from '@angular/forms';

export function fieldMatchValidator(
  field1Name: string,
  field2Name: string
) {
  return (group: FormGroup) => {
    if (group.controls[field1Name].value !==  group.controls[field2Name].value) {
        group.controls[field1Name].setErrors({notEquivalent: true});
        group.controls[field2Name].setErrors({notEquivalent: true});
  };
}}