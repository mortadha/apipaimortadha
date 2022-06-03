import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './password/password.component';
import { LostPasswordComponent } from './lost-password/lost-password.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'create-password',
    component: PasswordComponent,
    data: {setFirstPassword: true}
  },
  {
    path: 'reset-password',
    component: PasswordComponent,
    data: {setFirstPassword: false}
  },
  {
    path: 'lost-password',
    component: LostPasswordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
