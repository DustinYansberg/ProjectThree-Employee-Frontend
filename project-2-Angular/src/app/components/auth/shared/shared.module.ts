import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { COMPONENTS } from './components';
import { LoginButtonComponent } from './components/buttons/login-button.component';
import { SignupButtonComponent } from './components/buttons/signup-button.component';
import { LogoutButtonComponent } from './components/buttons/logout-button.component';

@NgModule({
  declarations: [
    ...COMPONENTS,
    LoginButtonComponent,
    SignupButtonComponent,
    LogoutButtonComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ...COMPONENTS,
    LoginButtonComponent,
    SignupButtonComponent,
    LogoutButtonComponent
  ],
})
export class SharedModule {}
