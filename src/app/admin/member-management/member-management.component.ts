import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-member-management',
  templateUrl: './member-management.component.html',
  styleUrls: ['../admin-common.scss', './member-management.component.scss']
})
export class MemberManagementComponent implements OnInit {
  users: User[] = [];
  selectedUsers: User[] = [];
  selectedUsersEmails: string = '';

  displaySendEmail = false;

  blockedDocument: boolean = true;

  constructor(private userService: UserService) { }


  ngOnInit() {
    this.blockedDocument = true;
    this.users = this.userService.getUsers();

    if(!this.users || this.users.length === 0) {
      this.userService.retriveUsers().subscribe(u_data => {
        this.users = <User[]>u_data;
        this.userService.setUsers(this.users);
        this.blockedDocument = false;
      });
    } else {
      this.blockedDocument = false;
    }
  }

  showSendEmail() {
    this.displaySendEmail = !this.displaySendEmail;
    this.selectedUsersEmails = this.getEmails();
  }

  deleteAccounts() {
    this.users = this.users.filter(item => this.selectedUsers.indexOf(item) < 0);
    this.selectedUsers = [];
  }

  closeDlg() {
    this.displaySendEmail = false;
  }

  getEmails() {
    let result: string[] = [];
    this.selectedUsers.forEach(u => {
      if (u.email && u.email.indexOf('@') > 0) result.push(u.email);
    });

    return result.toString();
  }
}
