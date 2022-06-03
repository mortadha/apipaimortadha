import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CguComponent } from './cgu.component';

const routes: Routes = [
  {
    path: '',
    component: CguComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CguRoutingModule {}
