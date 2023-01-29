import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {ChatComponent} from "../../components/chat/chat.component";
import {OrderManagementComponent} from "../../components/order-management/order-management.component";
import {PaymentManagementComponent} from "../../components/payment-management/payment-management.component";
import {ShipManagementComponent} from "../../components/ship-management/ship-management.component";

const routes: Routes = [{ path: '', component: DashboardComponent, children: [
  { path: '',   redirectTo: 'homePage', pathMatch: 'full' },
  { path: 'homePage', loadChildren: () => import('../../components/home-page/home-page.module').then(m => m.HomePageModule), data: { animation: 'isLeft'} },
  { path: 'manageItems', loadChildren: () => import('../../components/manage-items/manage-items.module').then(m => m.ManageItemsModule), data: { animation: 'isRight'} },
  { path: 'order', component: OrderManagementComponent, pathMatch: 'full', data: { animation: 'isLeft'}  },
  { path: 'payment', component: PaymentManagementComponent, pathMatch: 'full', data: { animation: 'isRight'}  },
  { path: 'ship', component: ShipManagementComponent, pathMatch: 'full', data: { animation: 'isLeft'}  },
  { path: 'userProfile', loadChildren: () => import('../../components/user-profile/user-profile.module').then(m => m.UserProfileModule), data: { animation: 'isLeft'} },
  { path: 'statics', loadChildren: () => import('../../components/statics/statics.module').then(m => m.StaticsModule) },
  { path: 'chat', component: ChatComponent, pathMatch: 'full' },
  ]},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
