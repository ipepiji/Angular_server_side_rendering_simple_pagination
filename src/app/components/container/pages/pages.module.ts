import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { HomepageModule } from './homepage/homepage.module';
import { DetailsModule } from './details/details.module';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { PagesComponent } from './pages.component';
import { LayoutComponent } from "../../../layout/layout.component";
import { NavbarComponent } from "../../../layout/navbar/navbar.component";

@NgModule({
  declarations: [
    PagesComponent,
    LayoutComponent,
    NavbarComponent,
  ],
  imports: [
    PagesRoutingModule,
    HomepageModule,
    DetailsModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class PagesModule { }