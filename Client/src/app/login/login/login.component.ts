import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { validateFieldsNgForm } from 'src/app/_services/utilities';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
      this.accountService.login(this.model).subscribe(response => {
        this.router.navigateByUrl('/question-panel');  
      });
  }

  submitLogin(){
    if(this.loginForm.valid){
      this.login();
    }else{
      validateFieldsNgForm(this.loginForm);
    }
  }

}
