import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthRouter } from '../../../shared/constants/router.constant';

const routes: Routes = [
    {
        path: '',
        redirectTo: AuthRouter.default,
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '**',
        redirectTo: AuthRouter.notFound,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }