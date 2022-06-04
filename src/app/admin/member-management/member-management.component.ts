import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-member-management',
  templateUrl: './member-management.component.html',
  styleUrls: ['../admin-common.scss', './member-management.component.scss']
})
export class MemberManagementComponent implements OnInit {
  users: User[] = [];
  selectedUsers: User[] = [];

  displaySendEmail = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  reload(){
    this.users = this.userService.getUsers();
  }
  showSendEmail() {
    this.displaySendEmail  = !this.displaySendEmail ;
  }
  closeDlg() {
    this.displaySendEmail = false;
  }
}
