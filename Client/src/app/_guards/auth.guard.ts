import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private toastrSrv: ToastrService,
    private router: Router){}

  canActivate(){

    let currentUser;

    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      currentUser = user;
    })

    if(currentUser){
      return true
    }

    this.toastrSrv.warning('Login to access');
    this.router.navigateByUrl('/login');
    return false;

  }
  
}
