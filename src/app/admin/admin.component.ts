import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  selection: string = 'Chapter Statistics';
  constructor(private userService: UserService, private papa: Papa) { }
  receiveSelection($event: string) {  
    this.selection = $event;
    console.log(this.selection);
  } 

  ngOnInit(): void {
  }
}
