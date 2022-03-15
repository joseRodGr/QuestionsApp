import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/_models/question';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-questions-asked',
  templateUrl: './questions-asked.component.html',
  styleUrls: ['./questions-asked.component.css']
})
export class QuestionsAskedComponent implements OnInit {

  questions: Partial<Question[]> = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(){
    this.questionService.getAskedQuestions().subscribe(response => {
      this.questions = response;
    })
  }

}
