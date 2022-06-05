import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {

  selection = 'PERSONAL';
  displayJoinMembership = false;

  constructor() { }

  ngOnInit(): void {
  }

}
