import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  Validators
} from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { ProductService } from '../../../../services/product.service';
import { AuthService } from '../../../../services/auth.service';
import { ModalComponent } from '../../../utilities/modal/modal.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  subs: any;
  columns: any;
  products: any;
  size: number = 5;
  page: number = 1;
  total: number = 0;

  constructor(protected productService: ProductService,
    protected authService: AuthService,
    public dialog: MatDialog,) {
    this.columns = [
      'Product',
      'Action'
    ]
  }

  ngOnDestroy() {
    if (this.subs)
      this.subs.unsubscribe();
  }

  ngOnInit() {
    this.loadProducts()
  }

  loadProducts() {
    let storedProducts: Array<any> = JSON.parse(sessionStorage.getItem('products') || '[]');
    this.subs = this.productService.getList()
      .pipe(switchMap((res: any) => {
        return res.map((obj: any) => ({
          ...obj,
          update: false
        }))
      }))
      .subscribe({
        next: (res: any) => {
          let combinedProducts = [res].concat(storedProducts)
          this.products = combinedProducts;
          this.total = combinedProducts.length;
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
    this.loadProducts();
  }

  openModal(type: string, product?: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      height: '350px',
      width: '450px',
      data: {
        legend: `${type} Product`,
        form: {
          product: new FormControl(type.toLowerCase() === 'add' ? '' : product.productName, Validators.required),
          address: new FormControl(type.toLowerCase() === 'add' ? '' : product.url, Validators.required),
        },
        input: [
          { label: 'Product', type: 'text', formControlName: 'product', placeholder: 'App ABC' },
          { label: 'Address', type: 'text', formControlName: 'address', placeholder: 'https://abc..' }
        ],
        button: type.toLowerCase() === 'add' ? [
          { type: 'add', name: 'Submit' },
        ] : [
          { type: 'update', name: 'Update' },
          { type: 'remove', name: 'Remove' },
        ],
        product
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      let storedProducts: Array<any> = JSON.parse(sessionStorage.getItem('products') || '[]');
      switch (result?.type) {
        case 'add':
          storedProducts = this.addProduct(storedProducts, result)
          break;

        case 'update':
          storedProducts = this.updateProduct(storedProducts, result)
          break;

        case 'remove':
          storedProducts = this.removeProduct(storedProducts, result)
          break;

        default:
          break;
      }
      sessionStorage.setItem('products', JSON.stringify(storedProducts))
      this.loadProducts()
    });
  }

  addProduct(storedProducts: any, result: any) {
    let tempArr = storedProducts;
    tempArr.push({
      id: this.generateID(24),
      productName: result.form.get('product').value,
      url: result.form.get('address').value,
      update: true
    })
    return tempArr;
  }

  updateProduct(storedProducts: any, result: any) {
    let tempArr = storedProducts;
    const index = tempArr.findIndex((obj: any) => obj.id === result.id)
    tempArr[index] = {
      ...tempArr[index],
      productName: result.form.get('product').value,
      url: result.form.get('address').value,
    }
    return tempArr;
  }

  removeProduct(storedProducts: any, result: any) {
    let tempArr = storedProducts;
    tempArr = tempArr.filter((obj: any) => obj.id !== result.id)
    return tempArr;
  }

  generateID(length: number) {
    let result = '',
      chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

}