import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';

import { UtilitiesModule } from '../../../utilities/utilities.module';
import { HomepageComponent } from './homepage.component';

@NgModule({
    declarations: [
        HomepageComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        UtilitiesModule,
    ],
})

export class HomepageModule { }