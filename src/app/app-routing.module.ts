import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundPageComponent} from "./core/not-found-page/not-found-page.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [{path: '', redirectTo: '/authentication', pathMatch: 'full' },
  { path: 'authentication', loadChildren: () => import('./core/authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'dashboard', loadChildren: () => import('./core/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'shared', loadChildren: () => import('./core/shared/shared.module').then(m => m.SharedModule) },
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
