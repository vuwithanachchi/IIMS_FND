import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './core/not-found-page/not-found-page.component';
import { ApprovelDialogComponent } from './core/approvel-dialog/approvel-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CookieModule} from "ngx-cookie";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { ChatComponent } from './components/chat/chat.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { OrderManagementComponent } from './components/order-management/order-management.component';
import { ShipManagementComponent } from './components/ship-management/ship-management.component';
import { PaymentManagementComponent } from './components/payment-management/payment-management.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "./core/shared/shared.module";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    ApprovelDialogComponent,
    ChatComponent,
    OrderManagementComponent,
    ShipManagementComponent,
    PaymentManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    CookieModule.forRoot(),
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    FontAwesomeModule,
    FormsModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTableModule,
    SharedModule,
    MatSortModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
