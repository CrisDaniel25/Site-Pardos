import { Routes } from '@angular/router';
import { BlocManagementComponent } from './content-management/bloc-management/bloc-management.component';
import { InfoManagementComponent } from './content-management/info-management/info-management.component';
import { TeamManagementComponent } from './content-management/team-management/team-management.component';
import { SponsorsManagementComponent } from './content-management/sponsors-management/sponsors-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { RecruitmentManagementComponent } from './recruitment-management/recruitment-management.component';

export const AdministrationRoutingModule: Routes = [
  {
    path: "user",
    component: UserManagementComponent
  },
  {
    path: "bloc",
    component: BlocManagementComponent
  },
  {
    path: "info",
    component: InfoManagementComponent
  },
  {
    path: "team",
    component: TeamManagementComponent
  },
  {
    path: "sponsors",
    component: SponsorsManagementComponent
  },
  {
    path: "recruitment",
    component: RecruitmentManagementComponent
  }
];
