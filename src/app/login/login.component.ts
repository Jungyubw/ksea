import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() selectEmitter = new EventEmitter<string> ();  
  displayPW = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(select:string){
    this.selectEmitter.emit(select);  
  }
}
