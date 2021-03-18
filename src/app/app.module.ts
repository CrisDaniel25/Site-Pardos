import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRouting } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { SponsorsPageComponent } from './sponsors-page/sponsors-page.component';
import { RecruitmentPageComponent } from './recruitment-page/recruitment-page.component';
import { AdministrationComponent } from './administration/administration.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AppComponent,
    HomeComponent,
    InfoPageComponent,
    TeamPageComponent,
    SponsorsPageComponent,
    RecruitmentPageComponent,
    AdministrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRouting, {  useHash: true }),
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
