import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { AllItemsComponent } from './components/all-items/all-items.component';
import {NgCircleProgressModule} from "ng-circle-progress";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {SharedModule} from "../../core/shared/shared.module";
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    HomePageComponent,
    StartScreenComponent,
    AllItemsComponent,
    ItemDetailsComponent
  ],
    imports: [
        CommonModule,
        HomePageRoutingModule,
        HttpClientModule,
        NgCircleProgressModule,
        MatIconModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        MatToolbarModule,
        MatPaginatorModule,
        SharedModule,
        NgCircleProgressModule.forRoot({
            // set defaults here
            radius: 100,
            outerStrokeWidth: 16,
            innerStrokeWidth: 8,
            outerStrokeColor: "#78C000",
            innerStrokeColor: "#C7E596",
            animationDuration: 300
        }),
        MatButtonModule
    ]
})
export class HomePageModule { }
