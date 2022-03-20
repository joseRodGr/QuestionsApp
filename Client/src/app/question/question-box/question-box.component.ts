import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/_models/question';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-question-box',
  templateUrl: './question-box.component.html',
  styleUrls: ['./question-box.component.css']
})
export class QuestionBoxComponent implements OnInit {

  @Input() question!: Question | undefined;
  @Input() type!:string;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
  }

  toggleStatus(){
      this.questionService.toggleStatus(Number(this.question?.id)).subscribe(() => {
        if(this.question){
          this.question.openQuestion = !this.question.openQuestion;
        }
      })
  }

}
