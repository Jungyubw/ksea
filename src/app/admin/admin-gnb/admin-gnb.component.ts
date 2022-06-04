import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-gnb',
  templateUrl: './admin-gnb.component.html',
  styleUrls: ['./admin-gnb.component.scss']
})
export class AdminGnbComponent implements OnInit {
  @Output() selectEmitter = new EventEmitter<string> ();  
  
  constructor() { }

  ngOnInit(): void {
  }

  onClick(select:string){
    this.selectEmitter.emit(select);  
  }

}
