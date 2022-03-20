import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/_models/question';
import { QuestionService } from 'src/app/_services/question.service';
import { WarningDialogComponent } from 'src/app/_dialogs/warning-dialog/warning-dialog.component';
import { CreateDialogComponent } from 'src/app/_dialogs/create-dialog/create-dialog.component';
import { AnswerService } from 'src/app/_services/answer.service';
import { ShareDialogComponent } from 'src/app/_dialogs/share-dialog/share-dialog.component';

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

  constructor(private questionService: QuestionService, private route: ActivatedRoute,
      public dialog: MatDialog, private router: Router, 
      private answerService: AnswerService) { }

  ngOnInit(): void {
    this.loadQuestion();
  }

  openDialogWarning(){
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: this.question.content
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteQuestion();
      }
    })
  }

  openDialogCreate(){
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      data: {title: 'answer', content: null}
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.addAnswer(result);
      }
    })
  }

  openDialogShare(){
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      data: {title: 'question', label: 'Enter an username', content: null}
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.shareQuestion(result);
      }
    })
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
    if(this.isEdit){
      if(this.question.content){this.newQuestion = this.question.content;}
      this.focusOnInput()
    };
  }

  focusOnInput(){
    setTimeout(() => {
      this.newInputQuestion.nativeElement.focus();
    }, 0); 
  }

  editQuestion(){
    if(this.newInputQuestion.nativeElement.classList.contains('ng-valid')){
      this.questionService.updateQuestion(Number(this.question.id), this.newQuestion).subscribe(response => {
        this.question.content = response.content;
      })
    }
    this.isEdit = !this.isEdit;
  }

  deleteAnswerBox(id: number){
    this.question.answers = this.question.answers?.filter(x=> x.id !== id);
  }

  deleteQuestion(){
    this.questionService.deleteQuestion(Number(this.question.id)).subscribe(() => {
      this.router.navigateByUrl('/question-panel/asked');
    });
  }

  addAnswer(content: string){
    this.answerService.createAnswer(Number(this.question.id), content).subscribe(response => {
      this.question.answers?.push(response);
    })
  }

  shareQuestion(usernames: string[]){
    usernames.forEach(x => {
      this.questionService.shareQuestion(x, Number(this.question.id)).subscribe(() => {
        console.log(`succesfully shared to ${x}`)
      }, error => {
        console.log(error);
      })
    })
  }



}
