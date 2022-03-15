import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/_models/question';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-questions-received',
  templateUrl: './questions-received.component.html',
  styleUrls: ['./questions-received.component.css']
})
export class QuestionsReceivedComponent implements OnInit {

  questions: Partial<Question[]> = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(){
    this.questionService.getReceivedQuestions().subscribe(response => {
      this.questions = response;
    })
  }

}
