import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageItemsComponent } from './manage-items.component';

const routes: Routes = [{ path: '', component: ManageItemsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageItemsRoutingModule { }
