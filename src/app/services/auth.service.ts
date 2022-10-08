import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

    url: string = environment.api;

    constructor(private http: HttpClient,
        private router: Router,) { }

    login(formData: FormData): Observable<Object> {
        const url = `${this.url}/auth`;
        const formDataToJSON = {
            username: formData.get('username'),
            password: formData.get('password'),
        }
        return this.http.post(url, formDataToJSON);
    }

    logout(): void {
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['auth']);
    }
}