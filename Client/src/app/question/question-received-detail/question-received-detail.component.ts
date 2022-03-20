import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerReceivedBoxComponent } from 'src/app/answer/answer-received-box/answer-received-box.component';
import { Question } from 'src/app/_models/question';
import { AnswerService } from 'src/app/_services/answer.service';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-question-received-detail',
  templateUrl: './question-received-detail.component.html',
  styleUrls: ['./question-received-detail.component.css']
})
export class QuestionReceivedDetailComponent implements OnInit {

  question!: Partial<Question>;
  answerIdSelected!: Number;
  @ViewChildren(AnswerReceivedBoxComponent) answerBoxes! : QueryList<AnswerReceivedBoxComponent>;

  constructor(private questionService: QuestionService, private route: ActivatedRoute,
    private answerService: AnswerService) { }

  ngOnInit(): void {
    this.loadQuestion();
  }

  loadQuestion(){
    const id = this.route.snapshot.paramMap.get('id');
    this.questionService.getReceivedQuestion(Number(id)).subscribe(response => {
      this.question = response;
    })
  }

  selectAnswerId(id: number){
    this.answerIdSelected = id;
    this.setBoxesStyle();
  }

  setBoxesStyle(){
    const currentSelectedBox = this.answerBoxes.find(x => x.isSelected);
    if(currentSelectedBox){
      currentSelectedBox.isSelected = false;
    }

    const newSelectedBox = this.answerBoxes.find(x => x.answer.id == this.answerIdSelected);
    if(newSelectedBox){
      newSelectedBox.isSelected = true;
    }
  }

  chooseAnswer(){
    if(this.answerIdSelected){
      this.answerService.chooseAnswer(Number(this.answerIdSelected)).subscribe(() => {
        this.question.hasAnswered = true;
      })
    }
  }

}
