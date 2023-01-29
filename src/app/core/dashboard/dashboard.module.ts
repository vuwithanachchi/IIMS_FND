import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LeftSideNavBarComponent } from './components/left-side-nav-bar/left-side-nav-bar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ClientComponent } from './components/top-bar/components/client/client.component';
import { UserProfileComponent } from './components/top-bar/components/user-profile/user-profile.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    DashboardComponent,
    LeftSideNavBarComponent,
    TopBarComponent,
    ClientComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ]
})
export class DashboardModule { }
