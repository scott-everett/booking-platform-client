import { FormGroup } from '@angular/forms';

export function endDateOnOrBeforeStartDate(
  field1Name: string,
  field2Name: string
) {
  return (group: FormGroup) => {
    if (
      !group.controls[field1Name].value ||
      !group.controls[field2Name].value
    ) {
      return null;
    }

    if (group.controls[field1Name].value >= group.controls[field2Name].value) {
      group.controls[field2Name].setErrors({
        endDateOnOrBeforeStartDate: true,
      });
    }
  };
}
