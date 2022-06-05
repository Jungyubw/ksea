import { Component, OnInit } from '@angular/core';
import { APS_DEF } from 'src/app/domain/aps_def';
import { User } from 'src/app/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-aps',
  templateUrl: './aps.component.html',
  styleUrls: ['../admin-common.scss','./aps.component.scss']
})
export class ApsComponent implements OnInit {
  apsdefs: APS_DEF[] = [];
  selectedItems: APS_DEF[] = [];
  newItem: APS_DEF={
    apsID: '',
    apsName: '',
    apsFullName: '',
    apsURL: '',
    temp: '',
    presidentID: '',
    isActive: ''
  };
  users: User[] = [];

  basicData: any;

  stackedOptions: any;

  displayAddAPS = false;

  displayEditAPS = false;

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
      this.apsdefs = this.userService.getAPSDEFs();

      let labels : string[] = [];

      this.apsdefs.forEach(def => labels.push(def.apsName));

      this.users = this.userService.getUsers();

      let dataMap = new Map();

      this.users.forEach(user => {

        if(user.apsList) {
          user.apsList.forEach(item => {

            if(!dataMap.get(item.apsID)) dataMap.set(item.apsID, {total: 0, r:0, g:0, u: 0, i:0, s:0, h:0, other:0});
            dataMap.get(item.apsID).total = dataMap.get(item.apsID).total + 1;
    
            if(user.memberType === 'U'){
              dataMap.get(item.apsID).u = dataMap.get(item.apsID).u + 1;
            } 
            else if(user.memberType === 'R'){
              dataMap.get(item.apsID).r = dataMap.get(item.apsID).r + 1;
            }
            else if(user.memberType === 'G'){
              dataMap.get(item.apsID).g = dataMap.get(item.apsID).g + 1;
            }
            else if(user.memberType === 'H'){
              dataMap.get(item.apsID).h = dataMap.get(item.apsID).h + 1;
            }
            else if(user.memberType === 'I'){
              dataMap.get(item.apsID).i = dataMap.get(item.apsID).i + 1;
            }
            else if(user.memberType === 'S'){
              dataMap.get(item.apsID).s = dataMap.get(item.apsID).s + 1;
            }
            else {
              dataMap.get(item.apsID).other = dataMap.get(item.apsID).other + 1;
            }
          });
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
      this.apsdefs.forEach(item => {

        if(dataMap.get(item.apsID)) {
          totals.push(dataMap.get(item.apsID).total);
          regulars.push(dataMap.get(item.apsID).r);
          undergraduates.push(dataMap.get(item.apsID).u);
          graduates.push(dataMap.get(item.apsID).g);
          honorarys.push(dataMap.get(item.apsID).h);
          internationals.push(dataMap.get(item.apsID).i);
          stypes.push(dataMap.get(item.apsID).s);
          unknowns.push(dataMap.get(item.apsID).other);
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
    this.displayAddAPS = !this.displayAddAPS;
    this.newItem ={
      apsID: '',
      apsName: '',
      apsFullName: '',
      apsURL: '',
      temp: '',
      presidentID: '',
      isActive: ''
    };
  }
  showEdit() {
    this.displayEditAPS= !this.displayEditAPS;
  }
  closeDlg() {
    this.displayAddAPS = false;
    this.displayEditAPS = false;
  }
  closeAndSaveDlg(){
    this.displayAddAPS = false;
    this.displayEditAPS = false;
    this.apsdefs.push(this.newItem);
    this.reload();
  }
}
