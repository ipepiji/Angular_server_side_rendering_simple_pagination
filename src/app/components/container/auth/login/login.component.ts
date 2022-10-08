import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnDestroy {
  form: FormGroup;
  subs: any;

  constructor(private fb: FormBuilder,
    protected cd: ChangeDetectorRef,
    protected service: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy() {
    if (this.subs)
      this.subs.unsubscribe();
  }

  onSubmit() {
    const formData = new FormData();
    formData.set('username', this.form.get('username')?.value);
    formData.set('password', this.form.get('password')?.value);
    this.subs = this.service.login(formData).subscribe({
      next: (res: any) => {
        const redirect = "pages";
        const message = `Authenticated! Welcome ${this.form.get('username')?.value}`;
        alert(message)
        localStorage.setItem("token", res.token);
        setTimeout(() => this.router.navigateByUrl(redirect), 500);
      },
      error: (err: any) => {
        alert(err.error.message)
        this.form.patchValue({
          password: '',
        });
        this.cd.detectChanges();
      }
    });
  }

}
