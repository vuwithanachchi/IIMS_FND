import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageItemsRoutingModule } from './manage-items-routing.module';
import { ManageItemsComponent } from './manage-items.component';
import { AddNewItemComponent } from './components/add-new-item/add-new-item.component';
import { AllItemsComponent } from './components/all-items/all-items.component';
import { UpdateItemsComponent } from './components/update-items/update-items.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {SharedModule} from "../../core/shared/shared.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MaterialFileInputModule} from "ngx-material-file-input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSortModule} from "@angular/material/sort";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
    declarations: [
        ManageItemsComponent,
        AddNewItemComponent,
        AllItemsComponent,
        UpdateItemsComponent
    ],
    exports: [
        AllItemsComponent
    ],
    imports: [
        CommonModule,
        ManageItemsRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatIconModule,
        MatSelectModule,
        SharedModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatInputModule,
        MaterialFileInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSortModule
    ]
})
export class ManageItemsModule { }
