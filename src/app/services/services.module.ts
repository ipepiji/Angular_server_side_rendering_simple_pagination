import { NgModule, ModuleWithProviders } from '@angular/core';

import { AuthService } from './auth.service';
import { ProductService } from './product.service';

const SERVICES = [
    AuthService,
    ProductService,
];

@NgModule({
    providers: [
        ...SERVICES,
    ],
})

export class ServicesModule {
    static forRoot(): ModuleWithProviders<ServicesModule> {
        return {
            ngModule: ServicesModule,
            providers: [
                ...SERVICES,
            ],
        };
    }
}