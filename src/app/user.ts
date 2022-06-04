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
    dob: string;
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
    registeredDate: string;
    lastUpdated: string;
    lastIPUsed: string;
    updatedBy: string;
    lastVisit: string;
    visitCount: string;
    lastPaidDate: string;
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

    specialtyList?: SPECIALITY_DEF[];
}