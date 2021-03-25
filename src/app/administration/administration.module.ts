import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdministrationRoutingModule } from './administration.routing';
import { BlocManagementComponent } from './content-management/bloc-management/bloc-management.component';
import { InfoManagementComponent } from './content-management/info-management/info-management.component';
import { TeamManagementComponent } from './content-management/team-management/team-management.component';
import { SponsorsManagementComponent } from './content-management/sponsors-management/sponsors-management.component';


@NgModule({
  declarations: [
    BlocManagementComponent, 
    InfoManagementComponent, 
    TeamManagementComponent, 
    SponsorsManagementComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdministrationRoutingModule)
  ]
})
export class AdministrationModule { }
