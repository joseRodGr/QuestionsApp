import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from 'src/app/_dialogs/warning-dialog/warning-dialog.component';
import { Answer } from 'src/app/_models/answer';

@Component({
  selector: 'app-answer-box',
  templateUrl: './answer-box.component.html',
  styleUrls: ['./answer-box.component.css']
})
export class AnswerBoxComponent {

  @Input() answer!: Answer;
  @ViewChild('answerInput') answerInput!: ElementRef;
  isEdit: boolean = false;
  
  constructor(public dialog: MatDialog) { }

  openDialog(){
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: this.answer.content
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteAnswer();
      }
    })
  }

  invertEdit(){
    this.isEdit = !this.isEdit;
    if(this.isEdit){this.focusAnswerInput()}
  }

  focusAnswerInput(){
    setTimeout(() => {
      this.answerInput.nativeElement.focus();
    },0);
  }

  deleteAnswer(){
    console.log("answer deleted");
  }

}
