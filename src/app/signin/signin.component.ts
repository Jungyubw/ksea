import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  @Output() selectEmitter = new EventEmitter<string> ();  
  displayPW = true;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(select:string){
    this.selectEmitter.emit(select);  
  }
}

