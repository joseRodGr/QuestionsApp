import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { validateAllFormFields } from '../_services/utilities';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm!: FormGroup;
  successful:boolean = false;

  constructor(private fb: FormBuilder, private accountService: AccountService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.forgotForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]]
    });
  }

  get email(){
    return this.forgotForm.get('email');
  }

  forgotPassword(email: string){
    this.accountService.forgotPassword(email).subscribe(() => {
      this.successful = true;
    })
  }

  submitForgotPassword(){
    if(this.forgotForm.valid){
      this.forgotPassword(this.email?.value)
    }else{
      validateAllFormFields(this.forgotForm);
    }
  }

}
