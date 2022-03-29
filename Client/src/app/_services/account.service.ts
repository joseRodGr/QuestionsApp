import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currenUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currenUserSource.asObservable();
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(model: any){

    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User | any) => {
        const user = response;  
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }

  logout(){
    localStorage.removeItem('user');
    this.currenUserSource.next(null);
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'account/register', model);
  }

  forgotPassword(email: string){
    return this.http.post(this.baseUrl + 'account/forgot-password/' + email, {});
  }

  setCurrentUser(user:User){
    localStorage.setItem('user', JSON.stringify(user));
    this.currenUserSource.next(user);
  }

}
