import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Question } from '../_models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getAskedQuestions(){
    return this.http.get<Partial<Question[]>>(this.baseUrl + 'question/asked');
  }

  getAskedQuestion(id: number){
    return this.http.get<Partial<Question>>(this.baseUrl + 'question/asked/' + id);
  }

  getReceivedQuestions(){
    return this.http.get<Partial<Question[]>>(this.baseUrl + 'question/received');
  }

  getReceivedQuestion(id: number){
    return this.http.get<Partial<Question>>(this.baseUrl + 'question/received/' + id);
  }

  updateQuestion(id: number, content: string){
    return this.http.put<Partial<Question>>(this.baseUrl + 'question/' + id, {content});
  }


}
