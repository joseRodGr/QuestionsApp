import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/_models/question';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-question-asked-detail',
  templateUrl: './question-asked-detail.component.html',
  styleUrls: ['./question-asked-detail.component.css']
})
export class QuestionAskedDetailComponent implements OnInit{

  question!: Partial<Question>;
  isEdit = false;
  newQuestion!: string;
  @ViewChild('newInputQuestion') newInputQuestion!: ElementRef;

  constructor(private questionService: QuestionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadQuestion();
  }

  loadQuestion(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.questionService.getAskedQuestion(Number(id)).subscribe(response => {
        this.question = response;
      });
    }
  }

  invertEdit(){
    this.isEdit = !this.isEdit;
    this.newQuestion = "";
    if(this.isEdit){this.focusOnInput()};
  }

  focusOnInput(){
    setTimeout(() => {
      this.newInputQuestion.nativeElement.focus();
    }, 0); 
  }

  editQuestion(){
    if(this.newInputQuestion.nativeElement.classList.contains('ng-invalid')){
      console.log('isInvalid');
    }else{
      this.questionService.updateQuestion(Number(this.question.id), this.newQuestion).subscribe(response => {
        this.question.content = response.content;
      })
    }
    this.isEdit = !this.isEdit;
  }



}
