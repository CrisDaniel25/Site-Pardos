import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { JwtModule } from "@auth0/angular-jwt";
import { GoogleMapsModule } from '@angular/google-maps'

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

import { UsersService } from '../app/services/users/users.service';
import { RequirementsComponent } from './requirements/requirements.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

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
    LoginComponent,
    RequirementsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    RouterModule.forRoot(AppRouting, {  useHash: true }),
    MDBBootstrapModule.forRoot(),
    JwtModule.forRoot({ config: { tokenGetter: tokenGetter } })
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
