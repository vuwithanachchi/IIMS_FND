import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticsRoutingModule } from './statics-routing.module';
import { StaticsComponent } from './statics.component';
import { SubStaticsComponent } from './components/sub-statics/sub-statics.component';
import { SubsStaticsComponent } from './components/subs-statics/subs-statics.component';
import {NgChartsModule} from "ng2-charts";
import {NgCircleProgressModule} from "ng-circle-progress";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    StaticsComponent,
    SubStaticsComponent,
    SubsStaticsComponent
  ],
  imports: [
    CommonModule,
    StaticsRoutingModule,
    HttpClientModule,
    NgChartsModule,
    NgCircleProgressModule.forRoot({}),
    MatIconModule
  ]
})
export class StaticsModule { }
