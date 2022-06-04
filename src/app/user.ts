import { Data } from "@angular/router";
import { APS_DEF } from "./aps_def";
import { Chapter } from "./chapter";
import { SPECIALITY_DEF } from "./specialty_def";
import { Technical_Group } from "./technical_group";

export interface User {
    memberId: string;
    KSEAId: string;
    loginId: string;
    loginPw: string;
    firstName: string;
    lastName: string;
    koreanFirst: string;
    koreanLast: string;
    chineaseName: string;
    gender: string;
    dob?: string;
    birth?: Date;
    title: string;
    email: string;
    homepageUrl: string;
    pictureFile: string;
    resumeFile: string;
    homePhone: string;
    homeCell: string;
    homeFax: string;
    homeStreet: string;
    homeCity: string;
    homeState: string;
    homeProvince: string;
    homeZip: string;
    billFirstName: string;
    billLastName: string;
    billStreet: string;
    billCity: string;
    billState: string;
    billProvince: string;
    billZip: string;
    affiliation: string;
    department: string;
    jobTitle: string;
    workHomeUrl: string;
    workEmail: string;
    workPhone: string;
    workStreet: string;
    workCity: string;
    workState: string;
    workProvince: string;
    workZip: string;
    prefContact: string;
    isInMemberDir: string;
    memberType: string;
    isYPG: string;
    memberStatus: string;
    accessRight: string;
    registeredDate?: string;
    registeredDateFormatted?: Date;
    lastUpdated?: string;
    lastUpdatedFormatted?: Date;
    lastIPUsed: string;
    updatedBy: string;
    lastVisit?: string;
    lastVisitFormatted?: Date;
    visitCount?: string;
    visitCountFormatted?: Number;
    lastPaidDate?: string;
    lastPaidDateFormatted?: Date;
    middleName: string;
    workFax: string;
    birthPlace: string;
    workCountry: string;
    citizenship: string;
    homeCountry: string;
    specialtyKeywords: string;
    remark: string;
    profileStatus: string;
    e_signature: string;
    kofst_agree: string;
    subscription: string;


    chapterCode: string;
    chapter?: Chapter;

    groupCode: string;
    group?: Technical_Group;

    apsList?: APS_DEF[];

    aps1?: APS_DEF;
    aps2?: APS_DEF;
    aps3?: APS_DEF;

    specialtyList?: SPECIALITY_DEF[];
    specialty1?: SPECIALITY_DEF;
    specialty2?: SPECIALITY_DEF;
    specialty3?: SPECIALITY_DEF;

}