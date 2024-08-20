import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginButtonComponent } from './buttons/login-button.component';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule
    ],
    declarations: [
      LoginButtonComponent
    ],
    exports: [
      LoginButtonComponent
    ]
})
export class AuthModule { }
