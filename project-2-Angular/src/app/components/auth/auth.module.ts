import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginButtonComponent } from './buttons/login-button.component';
import { LogoutButtonComponent } from './buttons/logout-button.component';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule
    ],
    declarations: [
      LoginButtonComponent,
      LogoutButtonComponent
    ],
    exports: [
      LoginButtonComponent,
      LogoutButtonComponent
    ]
})
export class AuthModule { }
