import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Answer } from 'src/app/_models/answer';

@Component({
  selector: 'app-answer-create-box',
  templateUrl: './answer-create-box.component.html',
  styleUrls: ['./answer-create-box.component.css']
})
export class AnswerCreateBoxComponent implements OnInit {

  @Input() answer!: any;
  @Output() onDeleted = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteAnswer(content: string){
    this.onDeleted.emit(content);
  }

}
