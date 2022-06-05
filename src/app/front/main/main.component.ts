import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Output() selectEmitter = new EventEmitter<string> ();  
  
  constructor(private userService: UserService) {
  }
  
  ngOnInit(): void {
  }

  onClick(select:string){
    this.selectEmitter.emit(select);  
    console.log(select);
  }

}
