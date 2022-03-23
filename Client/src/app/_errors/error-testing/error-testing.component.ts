import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-error-testing',
  templateUrl: './error-testing.component.html',
  styleUrls: ['./error-testing.component.css']
})
export class ErrorTestingComponent implements OnInit {

  baseurl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getBadRequest(){
    this.http.get(this.baseurl + 'buggy/bad-request-string').subscribe(response => {
      console.log(response);
    })
  }

  getBadRequestObject(){
    this.http.get(this.baseurl + 'buggy/bad-request-object').subscribe(response => {
      console.log(response);
    })
  }

  getNotFound(){
    this.http.get(this.baseurl + 'buggy/not-found-string').subscribe(response => {
      console.log(response);
    })
  }

  getNotFoundObject(){
    this.http.get(this.baseurl + 'buggy/not-found-object').subscribe(response => {
      console.log(response);
    })
  }

  getUnauthorize(){
    this.http.get(this.baseurl + 'buggy/not-authorize-string').subscribe(response => {
      console.log(response);
    })
  }

  getUnauthorizeObject(){
    this.http.get(this.baseurl + 'buggy/not-authorize-object').subscribe(response => {
      console.log(response);
    })
  }

  getServerError(){
    this.http.get(this.baseurl + 'buggy/server-error').subscribe(response => {
      console.log(response);
    })
  }

}
