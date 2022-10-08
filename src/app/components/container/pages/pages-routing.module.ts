import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DetailsComponent } from './details/details.component';
import { PagesRouter } from '../../../shared/constants/router.constant';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: '',
                redirectTo: PagesRouter.default,
                pathMatch: 'full',
            },
            {
                path: 'homepage',
                component: HomepageComponent
            },
            {
                path: 'details/:id',
                component: DetailsComponent
            },
            {
                path: '**',
                redirectTo: PagesRouter.notFound,
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }