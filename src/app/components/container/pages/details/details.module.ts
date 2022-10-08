import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core'
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { DetailsComponent } from './details.component';

@NgModule({
    declarations: [
        DetailsComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ]

})

export class DetailsModule { }