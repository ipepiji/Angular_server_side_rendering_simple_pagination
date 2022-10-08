import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';

import { ProductService } from '../../../../services/product.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  id: string;
  subs: any;
  columns: any;
  product: any;
  size: number = 5;
  page: number = 1;
  total: number = 0;
  form: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    protected productService: ProductService,
    protected authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')?.toString() || '';
    this.columns = [
      'Status',
      'Datetime',
      'Remark',
      'Duration',
    ];
    const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    const today = new Date()
    this.form = this.fb.group({
      startDate: new FormControl(yesterday, Validators.required),
      endDate: new FormControl(today, Validators.required),
    });
  }

  ngOnDestroy() {
    if (this.subs)
      this.subs.unsubscribe();
  }

  ngOnInit() {
    this.loadProduct()
    this.onFormChanges();
  }

  onFormChanges() {
    this.subs = this.form.valueChanges.subscribe(val => {
      if (val.startDate && val.endDate)
        this.loadProduct();
    });
  }

  loadProduct() {
    const id = this.id;
    const newFormat = 'YYYY-MM-DD'
    const formattedStartDate = moment(this.form.get('startDate')?.value).format(newFormat)
    const formattedEndDate = moment(this.form.get('endDate')?.value).format(newFormat)
    const params = `indexNumber=${this.page}&pageSize=${this.size}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
    this.subs = this.productService.getDetails(id, params)
      .subscribe({
        next: (res: any) => {
          this.product = res.data;
          this.total = res.length;
        },
        error: (err: any) => {
          if (err.error.toLowerCase() === 'unauthorized') {
            alert("Invalid/Expired token. Please re-login");
            this.authService.logout();
          }
          else
            alert(err.error)
        }
      });
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.loadProduct();
  }

}
