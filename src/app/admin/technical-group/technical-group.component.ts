import { Component, OnInit } from '@angular/core';
import { Technical_Group } from 'src/app/domain/technical_group';
import { User } from 'src/app/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-technical-group',
  templateUrl: './technical-group.component.html',
  styleUrls: ['../admin-common.scss', './technical-group.component.scss']
})
export class TechnicalGroupComponent implements OnInit {


  technialGroups: Technical_Group[] = [];
  newItem: Technical_Group = {
    groupCode: '',
    groupDesc: ''
  };
  users: User[] = [];

  basicData: any;

  stackedOptions: any;

  displayAddTG = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.stackedOptions = {
      plugins: {
          tooltips: {
              mode: 'index',
              intersect: false
          },
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              stacked: true,
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              stacked: true,
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          }
      }
    };

  }

  reload(){
    this.technialGroups = this.userService.getGroups();

    let labels : string[] = [];

    this.technialGroups.forEach(g => labels.push(g.groupCode));

    this.users = this.userService.getUsers();

    let dataMap = new Map();

    this.users.forEach(user => {
      if(!dataMap.get(user.groupCode)) dataMap.set(user.groupCode, {total: 0, r:0, g:0, u: 0, i:0, s:0, h:0, other:0});
      dataMap.get(user.groupCode).total = dataMap.get(user.groupCode).total + 1;

      if(user.memberType === 'U'){
        dataMap.get(user.groupCode).u = dataMap.get(user.groupCode).u + 1;
      }
      else if(user.memberType === 'R'){
        dataMap.get(user.groupCode).r = dataMap.get(user.groupCode).r + 1;
      }
      else if(user.memberType === 'G'){
        dataMap.get(user.groupCode).g = dataMap.get(user.groupCode).g + 1;
      }
      else if(user.memberType === 'H'){
        dataMap.get(user.groupCode).h = dataMap.get(user.groupCode).h + 1;
      }
      else if(user.memberType === 'I'){
        dataMap.get(user.groupCode).i = dataMap.get(user.groupCode).i + 1;
      }
      else if(user.memberType === 'S'){
        dataMap.get(user.groupCode).s = dataMap.get(user.groupCode).s + 1;
      }
      else {
        dataMap.get(user.groupCode).other = dataMap.get(user.groupCode).other + 1;
      }

    });

    let totals: number[] = [];
    let regulars: number[] = [];
    let undergraduates: number[] = [];
    let graduates: number[] = [];
    let honorarys: number[] = [];
    let internationals: number[] = [];
    let stypes: number[] = [];
    let unknowns: number[] = [];
    this.technialGroups.forEach(g => {

      if(dataMap.get(g.groupCode)) {
        totals.push(dataMap.get(g.groupCode).total);
        regulars.push(dataMap.get(g.groupCode).r);
        undergraduates.push(dataMap.get(g.groupCode).u);
        graduates.push(dataMap.get(g.groupCode).g);
        honorarys.push(dataMap.get(g.groupCode).h);
        internationals.push(dataMap.get(g.groupCode).i);
        stypes.push(dataMap.get(g.groupCode).s);
        unknowns.push(dataMap.get(g.groupCode).other);
      } else {
        totals.push(0);
        regulars.push(0);
        undergraduates.push(0);
        graduates.push(0);
        honorarys.push(0);
        internationals.push(0);
        stypes.push(0);
        unknowns.push(0);
      }
  });

    this.basicData = {
      labels: labels,
      datasets: [{
        type: 'bar',
        label: 'Regular',
        backgroundColor: '#42A5F5',
        data: regulars
    }, {
        type: 'bar',
        label: 'Undergraduate',
        backgroundColor: '#66BB6A',
        data: undergraduates
    }, {
        type: 'bar',
        label: 'Graduate',
        backgroundColor: '#FFA726',
        data: graduates
    }, {
      type: 'bar',
      label: 'Honorary',
      backgroundColor: '#FFD700',
      data: honorarys
    }, {
      type: 'bar',
      label: 'International',
      backgroundColor: '#FA8072',
      data: internationals
    }, {
      type: 'bar',
      label: 'S types??',
      backgroundColor: '#C0C0C0',
      data: stypes
    }, {
      type: 'bar',
      label: 'Unknowns',
      backgroundColor: '#000000',
      data: unknowns
    }]
    };
  }
  showAdd() {
    this.displayAddTG = !this.displayAddTG;
    this.newItem = {
      groupCode: '',
      groupDesc: ''
    };
  }
  closeDlg() {
    this.displayAddTG = false;
  }
  saveAndCloseDlg() {
    this.displayAddTG = false;
    this.technialGroups.push(this.newItem);
    this.reload();
  }
}
