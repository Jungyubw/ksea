import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-member-management',
  templateUrl: './member-management.component.html',
  styleUrls: ['./member-management.component.scss']
})
export class MemberManagementComponent implements OnInit {
  users: User[] = [];
  selectedUsers: User[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  reload(){
    this.users = this.userService.getUsers();
  }
}
