import { Component, OnInit } from '@angular/core';
import { Chapter } from 'src/app/domain/chapter';
import { User } from 'src/app/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['../admin-common.scss', './chapter.component.scss']
})
export class ChapterComponent implements OnInit {

  chapters: Chapter[] = [];
  newItem: Chapter = {
    chapterCode: '',
    chapterType: '',
    chapterName: '',
    chapterLoc: '',
    chapterUrl: '',
    subDomain: '',
    presidentId: '',
    MDId: '',
    dateApproved: '',
    kseaId: '',
    pro_code: ''
  };

  users: User[] = [];

  basicData: any;

  stackedOptions: any;

  displayAddChapter = false;

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
      this.chapters = this.userService.getChapters();

      let labels : string[] = [];

      this.chapters.forEach(c => labels.push(c.chapterName));

      this.users = this.userService.getUsers();

      let dataMap = new Map();

      this.users.forEach(user => {
        if(!dataMap.get(user.chapterCode)) dataMap.set(user.chapterCode, {total: 0, r:0, g:0, u: 0, i:0, s:0, h:0, other:0});
        dataMap.get(user.chapterCode).total = dataMap.get(user.chapterCode).total + 1;

        if(user.memberType === 'U'){
          dataMap.get(user.chapterCode).u = dataMap.get(user.chapterCode).u + 1;
        }
        else if(user.memberType === 'R'){
          dataMap.get(user.chapterCode).r = dataMap.get(user.chapterCode).r + 1;
        }
        else if(user.memberType === 'G'){
          dataMap.get(user.chapterCode).g = dataMap.get(user.chapterCode).g + 1;
        }
        else if(user.memberType === 'H'){
          dataMap.get(user.chapterCode).h = dataMap.get(user.chapterCode).h + 1;
        }
        else if(user.memberType === 'I'){
          dataMap.get(user.chapterCode).i = dataMap.get(user.chapterCode).i + 1;
        }
        else if(user.memberType === 'S'){
          dataMap.get(user.chapterCode).s = dataMap.get(user.chapterCode).s + 1;
        }
        else {
          dataMap.get(user.chapterCode).other = dataMap.get(user.chapterCode).other + 1;
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
      this.chapters.forEach(c => {

        if(dataMap.get(c.chapterCode)) {
          totals.push(dataMap.get(c.chapterCode).total);
          regulars.push(dataMap.get(c.chapterCode).r);
          undergraduates.push(dataMap.get(c.chapterCode).u);
          graduates.push(dataMap.get(c.chapterCode).g);
          honorarys.push(dataMap.get(c.chapterCode).h);
          internationals.push(dataMap.get(c.chapterCode).i);
          stypes.push(dataMap.get(c.chapterCode).s);
          unknowns.push(dataMap.get(c.chapterCode).other);
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
      this.newItem = {
        chapterCode: '',
        chapterType: '',
        chapterName: '',
        chapterLoc: '',
        chapterUrl: '',
        subDomain: '',
        presidentId: '',
        MDId: '',
        dateApproved: '',
        kseaId: '',
        pro_code: ''
      };
      this.displayAddChapter = !this.displayAddChapter;
    }
    closeDlg() {
      this.displayAddChapter = false;
    }
    saveAndCloseDlg() {
      this.displayAddChapter = false;
      this.chapters.push(this.newItem);
      this.reload();
    }
}
