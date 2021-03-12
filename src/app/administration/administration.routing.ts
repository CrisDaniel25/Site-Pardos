import { Routes } from '@angular/router';
import { ContentManagementComponent } from './content-management/content-management.component';
import { BlocManagementComponent } from './content-management/bloc-management/bloc-management.component';
import { InfoManagementComponent } from './content-management/info-management/info-management.component';
import { TeamManagementComponent } from './content-management/team-management/team-management.component';
import { SponsorsManagementComponent } from './content-management/sponsors-management/sponsors-management.component';

export const AdministrationRoutingModule: Routes = [
  {
    path: "content",
    component: ContentManagementComponent
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
  }
];
