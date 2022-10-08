import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServicesModule } from './services/services.module';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { Key } from './shared/constants/local-storage.constant';

export function tokenGetter() {
  return localStorage.getItem(Key.jwtToken);
}

export const PROVIDERS = [
  ServicesModule.forRoot().providers,
];

@NgModule({
  declarations: [
    AppComponent,
    FourOhFourComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
