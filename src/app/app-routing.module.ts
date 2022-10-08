import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainRouter } from './shared/constants/router.constant';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { GuestGuard } from './shared/guard/guest.guard';

const routes: Routes = [
  { path: '', redirectTo: MainRouter.default, pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./components/container/auth/auth.module')
      .then(m => m.AuthModule),
    canActivate: [GuestGuard],
  },
  {
    path: 'pages',
    loadChildren: () => import('./components/container/pages/pages.module')
      .then(m => m.PagesModule),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: MainRouter.notFound, pathMatch: 'full' },
  {
    path: '404',
    component: FourOhFourComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }