import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { validateAllFormFields } from '../_services/utilities';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  @ViewChild('regForm') regForm!: NgForm;
  registerSuccessful = false;

  constructor(private fb: FormBuilder, private toastrSvc: ToastrService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.intializeForm();
  }

  intializeForm(){
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {validators: this.checkEqualValues('password', 'confirmPassword')});

    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  checkEqualValues(controlNameA: string, controlNameB: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const valueControlA = group.get(controlNameA)?.value;
      const valueControlB = group.get(controlNameB)?.value;
      return (valueControlA === valueControlB ? null : {valuesDoNotMatch: true})
    }
  }

  get username(){
    return this.registerForm.get('username');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }

  get confirmPassword(){
    return this.registerForm.get('confirmPassword');
  }

  register(){
    this.accountService.register(this.registerForm.value).subscribe(() => {
      // this.toastrSvc.success('We sent you an account confirmation to your email. Please, check it!!!');
      this.registerSuccessful = true;
      this.regForm.resetForm();
    });
  }

  submitRegister(){
    if(this.registerForm.valid){
      this.register();
    }else{
      validateAllFormFields(this.registerForm);
    }
  }



}
