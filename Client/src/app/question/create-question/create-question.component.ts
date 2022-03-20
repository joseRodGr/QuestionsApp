import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/_services/question.service';


@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  createForm!: FormGroup;
  answers: any[] = [];

  constructor(private fb: FormBuilder, private questionService: QuestionService,
      private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.createForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    })
  }

  addAnswer(answer: string){
    if(!this.answers.find(x => x.content === answer)){
      this.answers.push({content: answer});
      this.createForm.controls.answer.reset();
    }
  }

  deleteAnswerBox(content: string){
    this.answers = this.answers.filter(x => x.content !== content);
  }

  createQuestion(){
    if(this.createForm.controls.question.value){
        const content = this.createForm.controls.question.value;
        this.questionService.createQuestion({content, answers: this.answers}).subscribe(() => {
          this.router.navigateByUrl('/question-panel/asked');
        })
    }
  }

}
