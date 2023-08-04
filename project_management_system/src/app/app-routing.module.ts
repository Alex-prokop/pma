import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainRouteComponent } from './main-route/main-route.component';
import { AuthGuard } from './helpers/auth.guard';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardComponent } from './board/board.component';
import { EditTaskBodyComponent } from './board-page/edit-task-body/edit-task-body.component';
import { BoardEditComponent } from './board/board-edit/board-edit.component';

const accountModule = () =>
  import('./auth/account.module').then((x) => x.AccountModule);

const routes: Routes = [
  { path: '', component: MainRouteComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: accountModule },
  { path: 'welcome-page', component: WelcomePageComponent },
  { path: 'main-route', component: MainRouteComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'boards/add', component: BoardComponent, canActivate: [AuthGuard] },
  {
    path: 'boards/edit/:id',
    component: BoardEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'boards/edit/:id/:columnId',
    component: BoardEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-task-body',
    component: EditTaskBodyComponent,
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
