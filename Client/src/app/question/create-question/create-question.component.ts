import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CanComponentLeave } from 'src/app/_helpers/canComponentLeave';
import { QuestionService } from 'src/app/_services/question.service';


@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit, CanComponentLeave {

  createForm!: FormGroup;
  answers: any[] = [];

  constructor(private fb: FormBuilder, private questionService: QuestionService,
      private router: Router, private toastSvc: ToastrService) { }
  
  canLeave(): boolean {
    if(this.createForm.dirty && this.answers.length > 0){
      return confirm('You have some unsaved changes. Any unsaved changes will be lost.');
    }
    return true;
  }

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
          this.createForm.reset();
          this.answers = [];
          this.router.navigateByUrl('/question-panel/asked');
          this.toastSvc.success('Question created successfully');
        })
    }else{
      this.toastSvc.warning('Complete question field')
    }
  }

}
