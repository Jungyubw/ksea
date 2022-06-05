import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {

  selection: string = 'main';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  receiveSelection($event: string) {  
    this.selection = $event;
    console.log(this.selection);
  } 
}
