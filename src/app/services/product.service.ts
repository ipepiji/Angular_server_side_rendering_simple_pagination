import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class ProductService {

    private visa: any;
    url: string = `${environment.api}/data`;
    headers: HeadersInit;
    requestOptions: Object;

    constructor(private http: HttpClient) {
        this.visa = '';
        this.headers = {}
        this.requestOptions = {}
    }

    setHeader(): void {
        this.visa = localStorage.getItem('token');
        this.headers = {
            'Authorization': `Bearer ${this.visa}`,
        };

        this.requestOptions = {
            headers: this.headers,
        };
    }

    getList(): Observable<Object> {
        this.setHeader();
        const url = `${this.url}/productList`;
        return this.http.get(url, this.requestOptions);
    }

    getDetails(id: any, params: any): Observable<Object> {
        this.setHeader();
        const url = `${this.url}/alert/list/${id}?${params}`;
        return this.http.get(url, this.requestOptions);
    }
}