import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';
import { Chapter } from '../domain/chapter';
import { Papa } from 'ngx-papaparse';
import { Technical_Group } from '../domain/technical_group';
import { APS_DEF } from '../domain/aps_def';
import { APS_MEMBER } from '../domain/aps_member';
import { SPECIALTY_MEMBER } from '../domain/specialty_member';
import { MS_DEF } from '../domain/ms_def';
import { SS_DEF } from '../domain/ss_def';
import { SPECIALITY_DEF } from '../domain/specialty_def';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private currentPage = 'main';
  private currentSubPage = '';
  private currentUser: any;

  private httpClient: HttpClient;
  private users : User[] = [];
  private chapters: Chapter[] = [];
  private groups: Technical_Group[] = [];
  private apsDefs: APS_DEF[] = [];
  private msDefs: MS_DEF[] = [];
  private ssDefs: SS_DEF[] = [];
  private aps_members: APS_MEMBER[] = [];
  private specialty_members: SPECIALTY_MEMBER[] = [];

  constructor(http: HttpClient, private papa: Papa) {
    this.httpClient = http;
    this.loadMembers();
   }

  loadMembers(){
    this.httpClient.get('assets/member.csv', {responseType: 'text'})
        .subscribe(m_data => {
          this.users = <User[]>this.CSVToJSON(m_data, this.users).data;
          this.httpClient.get('assets/chapter_meta.csv', {responseType: 'text'})
        .subscribe(cm_data => {
          this.chapters = this.CSVToJSON(cm_data, this.chapters).data;
          this.httpClient.get('assets/tgroup_meta.csv', {responseType: 'text'})
        .subscribe(gm_data => {
          this.groups = this.CSVToJSON(gm_data, this.groups).data;
          this.httpClient.get('assets/aps_meta.csv', {responseType: 'text'})
        .subscribe(aps_data => {
          this.apsDefs = this.CSVToJSON(aps_data, this.apsDefs).data;
          this.httpClient.get('assets/aps_member.csv', {responseType: 'text'})
        .subscribe(aps_member_data => {
          this.aps_members = this.CSVToJSON(aps_member_data, this.aps_members).data;
          this.httpClient.get('assets/specialty_member.csv', {responseType: 'text'})
        .subscribe(specialty_member_data => {
          this.specialty_members = this.CSVToJSON(specialty_member_data, this.specialty_members).data;
          this.httpClient.get('assets/ms_meta.csv', {responseType: 'text'})
        .subscribe(ms_meta_data => {
          this.msDefs = this.CSVToJSON(ms_meta_data, this.msDefs).data;
          this.httpClient.get('assets/ss_meta.csv', {responseType: 'text'})
        .subscribe(ss_meta_data => {
          this.ssDefs = this.CSVToJSON(ss_meta_data, this.ssDefs).data;
          this.users.forEach(u => {
            if(u.chapterCode) u.chapter = this.getChapterByChpaterCode(u.chapterCode);
            if(u.groupCode) u.group = this.getGroupByGroupCode(u.groupCode);
            u.apsList = this.getAPSsByMemberId(u.memberId);
            u.specialtyList = this.getSpecialtyByKseaId(u.KSEAId);
            if(u.dob) {
              u.dob = u.dob.replace("00:00:00.000", "");
              if(u.dob === 'NULL') u.dob = undefined;
              if(u.dob) u.birth = new Date(u.dob);
            }

            if(u.registeredDate) {
              u.registeredDate = u.registeredDate.replace("00:00:00.000", "");
              if(u.registeredDate === 'NULL') u.registeredDate = undefined;
              if(u.registeredDate) u.registeredDateFormatted = new Date(u.registeredDate);
            }

            if(u.lastUpdated) {
              u.lastUpdated = u.lastUpdated.replace("00:00:00.000", "");
              if(u.lastUpdated === 'NULL') u.lastUpdated = undefined;
              if(u.lastUpdated) u.lastUpdatedFormatted = new Date(u.lastUpdated);
            }

            if(u.lastVisit) {
              u.lastVisit = u.lastVisit.replace("00:00:00.000", "");
              if(u.lastVisit === 'NULL') u.lastVisit = undefined;
              if(u.lastVisit) u.lastVisitFormatted = new Date(u.lastVisit);
            }

            if(u.lastPaidDate) {
              u.lastPaidDate = u.lastPaidDate.replace("00:00:00.000", "");
              if(u.lastPaidDate === 'NULL') u.lastPaidDate = undefined;
              if(u.lastPaidDate) u.lastPaidDateFormatted = new Date(u.lastPaidDate);
            }

            if(u.visitCount) {
              if(u.visitCount === 'NULL') u.visitCount = undefined;
              if(u.visitCount) u.visitCountFormatted = new Number(u.visitCount);
            }

            if(u.apsList) {
              if(u.apsList.length > 0) u.aps1 = u.apsList[0];
              if(u.apsList.length > 1) u.aps2 = u.apsList[1];
              if(u.apsList.length > 2) u.aps3 = u.apsList[2];
            }

            if(u.specialtyList) {
              if(u.specialtyList.length > 0) u.specialty1 = u.specialtyList[0];
              if(u.specialtyList.length > 1) u.specialty2 = u.specialtyList[1];
              if(u.specialtyList.length > 2) u.specialty3 = u.specialtyList[2];
            }
          });
          console.log(this.findUserByKSEAId("1237107"));
        });
        });
        });
        });
        });
        });
        });
        }
    );
  }

  getCurrentPage(){
    return this.currentPage;
  }

  getCurrentSubPage(){
    return this.currentSubPage;
  }

  getCurrentUser(){
    return this.currentUser;
  }

  CSVToJSON(csv:string, holder:any) {
    return this.papa.parse(csv,{
      header: true,
      complete: (result) => {
        holder = result.data;
      }
    });
  };

  getMSDEFs() {
    return this.msDefs;
  }

  getspecialtyDEFs() {
    let list:SPECIALITY_DEF[] = [];

    this.ssDefs.forEach(item => {
      const msFound = this.msDefs.find((def) => def.MainSpecialtyCode === item.MainSpecialtyCode);
      
      if(msFound) {
        let found:SPECIALITY_DEF= {
          SS_ID: item.SS_ID,
          SubSpecialtyCode: item.SubSpecialtyCode,
          SubSpecialtyDesc: item.SubSpecialtyDesc,
          MainSpecialtyCode: item.MainSpecialtyCode,
          MainSpecialtyDesc: msFound.MainSpecialtyDesc,
          NRFCode: item.NRFCode
        };    
        list.push(found);
      }
      else {
        let found:SPECIALITY_DEF= {
          SS_ID: item.SS_ID,
          SubSpecialtyCode: item.SubSpecialtyCode,
          SubSpecialtyDesc: item.SubSpecialtyDesc,
          MainSpecialtyCode: item.MainSpecialtyCode,
          NRFCode: item.NRFCode
        }; 
        list.push(found);
      }
    });

    return list;
  }

  getAPSDEFs() {
    return this.apsDefs;
  }

  getGroups() {
    return this.groups;
  }

  getChapters() {
    return this.chapters;
  }

  getUsers() {
    return this.users;
  }

  getChapterByChpaterCode(chapterCode: string) {
    return this.chapters.find((i) => i.chapterCode === chapterCode);
  }

  getGroupByGroupCode(groupCode: string) {
    return this.groups.find((i) => i.groupCode === groupCode);
  }

  getAPSsByMemberId(id: string) {
    const apsList: APS_MEMBER[] = this.aps_members.filter((i) => i.memberID === id);
    if(apsList) {
      let result: APS_DEF[] = [];

      apsList.forEach((i) => {
        let found = this.apsDefs.find((def) => def.apsID === i.APS_ID);
        if(found) result.push(found);
      });
      return result;
    }
    return undefined;
  }

  getSpecialtyByKseaId(KSEAId: string) {
    const specialtyList: SPECIALTY_MEMBER[] = this.specialty_members.filter((i) => i.KSEAID === KSEAId);

    if(specialtyList) {
      let result: SPECIALITY_DEF[] = [];

      specialtyList.forEach((i) => {
        const ssFound = this.ssDefs.find((def) => def.SS_ID === i.SS_ID);
        if(ssFound) {
          const msFound = this.msDefs.find((def) => def.MainSpecialtyCode === ssFound.MainSpecialtyCode);
          if(msFound) {
            let found:SPECIALITY_DEF= {
              SS_ID: ssFound.SS_ID,
              SubSpecialtyCode: ssFound.SubSpecialtyCode,
              SubSpecialtyDesc: ssFound.SubSpecialtyDesc,
              MainSpecialtyCode: msFound.MainSpecialtyCode,
              MainSpecialtyDesc: msFound.MainSpecialtyDesc,
              NRFCode: ssFound.NRFCode
            };
            result.push(found);
          }
        }

      });
      return result;
    }
    return undefined;
  }

  findUserByKSEAId(id:string) {
    return this.users.find((i) => i.KSEAId === id);
  }

  findUserByMemberId(id:string) {
    return this.users.find((i) => i.memberId === id);
  }

  findUserByLoginId(id:string) {
    return this.users.find((i) => i.loginId === id);
  }
}
