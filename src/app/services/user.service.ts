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
  private specialtyDefs: SPECIALITY_DEF[] = [];

  private baseUrl = "http://35.89.107.87:3000";
  private userUrl = this.baseUrl + "/api/users/";
  private chapterUrl = this.baseUrl + "/api/chapters/";
  private apsUrl = this.baseUrl + "/api/aps/";
  private groupUrl = this.baseUrl +  "/api/groups/";
  private specialtyUrl =this.baseUrl +  "/api/specialty/";
  private msdefUrl = this.baseUrl + "/api/msdef/";

  constructor(http: HttpClient, private papa: Papa) {
    this.httpClient = http;
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

  getUsers(){
    return this.users;
  }

  setUsers(users:User[]){
    this.users = users;
  }

  retriveUsers(){
    return this.httpClient.get(this.userUrl);
  }

  getChapters(){
    return this.chapters;
  }

  setChapters(chapters:Chapter[]){
    this.chapters = chapters;
  }

  retriveChapters(){
    return this.httpClient.get(this.chapterUrl);
  }

  getApsDefs(){
    return this.apsDefs;
  }

  setApsDefs(apsDefs:APS_DEF[]){
    this.apsDefs = apsDefs;
  }

  retriveApsDefs(){
    return this.httpClient.get(this.apsUrl);
  }

  getGroups(){
    return this.groups;
  }

  setGroups(groups:Technical_Group[]){
    this.groups = groups;
  }

  retriveGroups(){
    return this.httpClient.get(this.groupUrl);
  }

  getMsDefs(){
    return this.msDefs;
  }

  setMsDefs(msDefs:MS_DEF[]){
    this.msDefs = msDefs;
  }

  retriveMsDefs(){
    return this.httpClient.get(this.msdefUrl);
  }

  getSpecialtyDefs(){
    return this.specialtyDefs;
  }

  setSpecialtyDefs(specialtyDefs:SPECIALITY_DEF[]){
    this.specialtyDefs = specialtyDefs;
  }

  retriveSpecialtyDefs(){
    return this.httpClient.get(this.specialtyUrl);
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
