import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generic-box',
  templateUrl: './generic-box.component.html',
  styleUrls: ['./generic-box.component.css']
})
export class GenericBoxComponent{

  @Input() model!: any;
  @Output() onDelete = new EventEmitter<any>();

  constructor() { }

  deleteBox(content: any){
    this.onDelete.emit(content);
  }


}
