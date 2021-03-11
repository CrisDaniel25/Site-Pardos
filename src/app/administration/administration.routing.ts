import { Routes } from '@angular/router';
import { ContentManagementComponent } from './content-management/content-management.component';

export const AdministrationRoutingModule: Routes = [
  {
    path: "content",
    component: ContentManagementComponent
  }
];
