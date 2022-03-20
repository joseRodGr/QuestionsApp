import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Answer } from '../_models/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  updateAnswer(id: number, newAnswer: string){
    return this.http.put(this.baseUrl + 'answer/update/' + id, {content: newAnswer});
  }

  deleteAnswer(id: number){
    return this.http.delete(this.baseUrl + 'answer/delete/' + id);
  }

  createAnswer(questionId: number, answerContent: string){
    return this.http.post<Answer>(this.baseUrl + 'answer/add/' + questionId, {content: answerContent});
  }

  chooseAnswer(id: number){
    return this.http.put(this.baseUrl + 'answer/choose/' + id, {});
  }

}
