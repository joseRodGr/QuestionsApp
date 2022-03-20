import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from 'src/app/_dialogs/warning-dialog/warning-dialog.component';
import { Answer } from 'src/app/_models/answer';
import { AnswerService } from 'src/app/_services/answer.service';


@Component({
  selector: 'app-answer-box',
  templateUrl: './answer-box.component.html',
  styleUrls: ['./answer-box.component.css']
})
export class AnswerBoxComponent {

  @Input() answer!: Answer;
  newAnswer!: string;
  @ViewChild('answerInput') answerInput!: ElementRef;
  isEdit: boolean = false;
  @Output() onDeleted = new EventEmitter<number>();
  
  constructor(public dialog: MatDialog, private answerService: AnswerService) { }

  openDialog(){
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: this.answer.content
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteAnswer(this.answer.id);
      }
    })
  }

  invertEdit(){
    this.isEdit = !this.isEdit;
    if(this.isEdit){
      this.newAnswer = this.answer.content;
      this.focusAnswerInput()
    }
  }

  focusAnswerInput(){
    setTimeout(() => {
      this.answerInput.nativeElement.focus();
    },0);
  }

  editAnswer(){
    if(this.answerInput.nativeElement.classList.contains('ng-valid')){
      this.answerService.updateAnswer(this.answer.id, this.newAnswer).subscribe(() => {
        this.answer.content = this.newAnswer;
      })
      this.isEdit = !this.isEdit;
    }
  }

  deleteAnswer(id: number){
    this.answerService.deleteAnswer(id).subscribe(() => {
      this.onDeleted.emit(id);
    });
  }

}
