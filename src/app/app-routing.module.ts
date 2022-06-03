import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
    {
      path: 'auth',
      loadChildren: './scenes/auth/auth.module#AuthModule'
    },
    {
      path: 'freelance',
      loadChildren: './scenes/freelance/freelance.module#FreelanceModule',
      canActivate: [AuthGuard],
      data: {
        expectedRole: 'Freelance'
      }
    },
    {
      path: 'agent',
      loadChildren: './scenes/agent/agent.module#AgentModule',
      canActivate: [AuthGuard],
      data: {
        expectedRole: 'Agent'
      }
    },
    {
      path: 'entreprise',
      loadChildren: './scenes/company/company.module#CompanyModule',
      canActivate: [AuthGuard],
      data: {
        expectedRole: 'Company'
      }
    },
    {
      path: 'boarding',
      loadChildren: './scenes/boarding/boarding.module#BoardingModule',
    },
    {
      path: 'legal',
      loadChildren: './scenes/cgu/cgu.module#CguModule',
      pathMatch: 'full'
    },
    { path: '',
      canActivate: [AuthGuard],
      redirectTo: '/auth/login',
      pathMatch: 'full'
    },
    {
      path: '**',
      loadChildren: './scenes/page-not-found/page-not-found.module#PageNotFoundModule',
    }
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    // enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
