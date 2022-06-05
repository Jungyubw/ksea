import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gnb',
  templateUrl: './gnb.component.html',
  styleUrls: ['./gnb.component.scss']
})
export class GnbComponent implements OnInit {
  @Output() selectEmitter = new EventEmitter<string> ();  
  currentUser: any;
  
  constructor(private userService: UserService, private router: Router) {
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
  }

  onClick(select:string){
    this.selectEmitter.emit(select);  
  }

  redirect() {
    this.router.navigate(['admin']);
  }
}
