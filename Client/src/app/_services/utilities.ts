import { FormGroup, NgForm } from "@angular/forms";


export function validateAllFormFields(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
}

export function validateFieldsNgForm(form: NgForm){
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field];
      control?.markAsTouched({ onlySelf: true });
    });
}