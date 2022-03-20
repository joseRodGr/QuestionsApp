import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css']
})
export class ShareDialogComponent implements OnInit {

  usernames: string [] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, label: string, content: string}) { }

  ngOnInit(): void {
  }

  addUsername(username: string){
    if(username && username.trim()!==''){
      if(!this.usernames.includes(username)){
        this.usernames.push(username);
      }
      this.data.content = '';
    }
  }

  deleteUsernameBox(username: string){
    this.usernames = this.usernames.filter(x => x !== username);
  }

}
