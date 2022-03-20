import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Answer } from 'src/app/_models/answer';

@Component({
  selector: 'app-answer-received-box',
  templateUrl: './answer-received-box.component.html',
  styleUrls: ['./answer-received-box.component.css']
})
export class AnswerReceivedBoxComponent implements OnInit {

  @Input() answer!: Partial<Answer>;
  @Input() hasAnswered! : boolean | undefined;
  @Output() selectAnswer = new EventEmitter<number>()
  isSelected: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  chooseAnswer(){
    this.selectAnswer.emit(this.answer.id);
    
  }

}
