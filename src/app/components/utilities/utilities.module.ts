import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';

import { ModalComponent } from './modal/modal.component';

@NgModule({
    declarations: [
        ModalComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
    ],
    exports: []
})

export class UtilitiesModule { }