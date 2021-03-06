import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {DialogModule} from 'primeng/dialog';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ChartModule} from 'primeng/chart';
import {BlockUIModule} from 'primeng/blockui';
import {ProgressBarModule} from 'primeng/progressbar';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GnbComponent } from './front/gnb/gnb.component';
import { FrontComponent } from './front/front.component';
import { AdminComponent } from './admin/admin.component';
import { SigninComponent } from './signin/signin.component';
import { MypageComponent } from './mypage/mypage.component';
import { AdminGnbComponent } from './admin/admin-gnb/admin-gnb.component';
import { MainComponent } from './front/main/main.component';
import { FooterComponent } from './front/footer/footer.component';
import { BoardNoticeComponent } from './front/board-notice/board-notice.component';
import { HttpClientModule } from '@angular/common/http';

import { NgxCsvParserModule } from 'ngx-csv-parser';
import { ChapterComponent } from './admin/chapter/chapter.component';
import { TechnicalGroupComponent } from './admin/technical-group/technical-group.component';
import { ApsComponent } from './admin/aps/aps.component';
import { SpecialtyComponent } from './admin/specialty/specialty.component';
import { MemberManagementComponent } from './admin/member-management/member-management.component';
import { LoginComponent } from './login/login.component';
import { MembershipComponent } from './front/membership/membership.component';
import { AboutComponent } from './front/about/about.component';
import { OrganizationComponent } from './front/organization/organization.component';

@NgModule({
  declarations: [
    AppComponent,
    GnbComponent,
    FrontComponent,
    AdminComponent,
    SigninComponent,
    MypageComponent,
    AdminGnbComponent,
    MainComponent,
    FooterComponent,
    BoardNoticeComponent,
    ChapterComponent,
    TechnicalGroupComponent,
    ApsComponent,
    SpecialtyComponent,
    MemberManagementComponent,
    LoginComponent,
    MembershipComponent,
    AboutComponent,
    OrganizationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ScrollingModule,
    AppRoutingModule,
    DialogModule,
    PaginatorModule,
    TableModule,
    ChartModule,
    HttpClientModule,
    NgxCsvParserModule,
    BlockUIModule,
    ProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
