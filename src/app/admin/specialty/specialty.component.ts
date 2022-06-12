import { Component, OnInit } from '@angular/core';
import { MS_DEF } from 'src/app/domain/ms_def';
import { SPECIALITY_DEF } from 'src/app/domain/specialty_def';
import { User } from 'src/app/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['../admin-common.scss', './specialty.component.scss']
})
export class SpecialtyComponent implements OnInit {
  specialtyDefs: SPECIALITY_DEF[] = [];
  msDefs: MS_DEF[] = [];
  users: User[] = [];

  basicData: any;

  stackedOptions: any;

  displayAddSpecialty = false;

  displayEditSpecialty = false;

  blockedDocument: boolean = true;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.blockedDocument = true;
    this.users = this.userService.getUsers();
    this.specialtyDefs = this.userService.getSpecialtyDefs();
    this.msDefs = this.userService.getMsDefs();

    if (!this.users || this.users.length === 0) {
      this.userService.retriveUsers().subscribe(u_data => {
        this.users = <User[]>u_data;
        this.userService.setUsers(this.users);

        if (!this.msDefs || this.msDefs.length === 0) {
          this.userService.retriveMsDefs().subscribe(c_data => {
            this.msDefs = <MS_DEF[]>c_data;
            this.userService.setMsDefs(this.msDefs);
          });
        }

        if (!this.specialtyDefs || this.specialtyDefs.length === 0) {
          this.userService.retriveSpecialtyDefs().subscribe(c_data => {
            this.specialtyDefs = <SPECIALITY_DEF[]>c_data;
            this.userService.setSpecialtyDefs(this.specialtyDefs);
            this.reload();
            this.blockedDocument = false;
          });
        }
      });
    } else {
      if (!this.msDefs || this.msDefs.length === 0) {
        this.userService.retriveMsDefs().subscribe(c_data => {
          this.msDefs = <MS_DEF[]>c_data;
          this.userService.setMsDefs(this.msDefs);
        });
      }

      if (!this.specialtyDefs || this.specialtyDefs.length === 0) {
        this.userService.retriveSpecialtyDefs().subscribe(c_data => {
          this.specialtyDefs = <SPECIALITY_DEF[]>c_data;
          this.userService.setSpecialtyDefs(this.specialtyDefs);
          this.reload();
          this.blockedDocument = false;
        });
      } else {
        this.reload();
        this.blockedDocument = false;
      }
    }

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

  reload() {
    let labels: string[] = [];

    this.msDefs.forEach(def => labels.push(def.MainSpecialtyDesc));

    let dataMap = new Map();

    this.users.forEach(user => {

      if (user.specialtyList) {
        user.specialtyList.forEach(item => {

          if (!dataMap.get(item.MainSpecialtyCode)) dataMap.set(item.MainSpecialtyCode, { total: 0, r: 0, g: 0, u: 0, i: 0, s: 0, h: 0, other: 0 });
          dataMap.get(item.MainSpecialtyCode).total = dataMap.get(item.MainSpecialtyCode).total + 1;

          if (user.memberType === 'U') {
            dataMap.get(item.MainSpecialtyCode).u = dataMap.get(item.MainSpecialtyCode).u + 1;
          }
          else if (user.memberType === 'R') {
            dataMap.get(item.MainSpecialtyCode).r = dataMap.get(item.MainSpecialtyCode).r + 1;
          }
          else if (user.memberType === 'G') {
            dataMap.get(item.MainSpecialtyCode).g = dataMap.get(item.MainSpecialtyCode).g + 1;
          }
          else if (user.memberType === 'H') {
            dataMap.get(item.MainSpecialtyCode).h = dataMap.get(item.MainSpecialtyCode).h + 1;
          }
          else if (user.memberType === 'I') {
            dataMap.get(item.MainSpecialtyCode).i = dataMap.get(item.MainSpecialtyCode).i + 1;
          }
          else if (user.memberType === 'S') {
            dataMap.get(item.MainSpecialtyCode).s = dataMap.get(item.MainSpecialtyCode).s + 1;
          }
          else {
            dataMap.get(item.MainSpecialtyCode).other = dataMap.get(item.MainSpecialtyCode).other + 1;
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
    this.msDefs.forEach(item => {

      if (dataMap.get(item.MainSpecialtyCode)) {
        totals.push(dataMap.get(item.MainSpecialtyCode).total);
        regulars.push(dataMap.get(item.MainSpecialtyCode).r);
        undergraduates.push(dataMap.get(item.MainSpecialtyCode).u);
        graduates.push(dataMap.get(item.MainSpecialtyCode).g);
        honorarys.push(dataMap.get(item.MainSpecialtyCode).h);
        internationals.push(dataMap.get(item.MainSpecialtyCode).i);
        stypes.push(dataMap.get(item.MainSpecialtyCode).s);
        unknowns.push(dataMap.get(item.MainSpecialtyCode).other);
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
    this.displayAddSpecialty = !this.displayAddSpecialty;
  }
  showEdit() {
    this.displayEditSpecialty = !this.displayEditSpecialty;
  }
  closeDlg() {
    this.displayAddSpecialty = false;
    this.displayEditSpecialty = false;
  }
}

