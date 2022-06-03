import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { PasswordComponent} from './password/password.component';
import { LostPasswordComponent } from './lost-password/lost-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    AuthRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    LostPasswordComponent,
    LoginComponent,
    PasswordComponent
  ],
  providers: []
})
export class AuthModule {}
