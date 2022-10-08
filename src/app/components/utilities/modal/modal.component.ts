import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ModalComponent {
    form: FormGroup = this.fb.group({});
    modalData: any;

    constructor(@Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<ModalComponent>,
        private fb: FormBuilder
    ) {
        if (this.data) {
            this.modalData = this.data;
            this.form = this.fb.group(this.modalData.form);
        }
    }

    onClick(type: string): void {
        const result = {
            type,
            form: this.form,
            id: this.modalData.product?.id
        }
        this.dialogRef.close(result);
    }

}