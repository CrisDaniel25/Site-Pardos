import { Routes } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { HomeComponent } from './home/home.component'
import { InfoPageComponent } from './info-page/info-page.component';
import { LoginComponent } from './login/login.component';
import { RecruitmentPageComponent } from './recruitment-page/recruitment-page.component';
import { SponsorsPageComponent } from './sponsors-page/sponsors-page.component';
import { TeamPageComponent } from './team-page/team-page.component';

import { AuthguardService } from './services/auth-guard/authguard.service';

export const AppRouting: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full"
  },
  {
    path: "info",
    component: InfoPageComponent
  },
  {
    path: "team",
    component: TeamPageComponent    
  },
  {
    path: "sponsors",
    component: SponsorsPageComponent
  },
  {
    path: "recruitment",
    component: RecruitmentPageComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    //canActivate: [AuthGuardService],
    children: [
      {
        path: "menu/administration",
        component: AdministrationComponent
      },
      {
        path: "administration",
        loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule)
      }
    ]
  }
];
