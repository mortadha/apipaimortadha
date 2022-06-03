import { NgModule, Optional, SkipSelf, ModuleWithProviders, APP_INITIALIZER, ErrorHandler, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';

import { LoaderInterceptor, LoaderService } from './interceptors/http.interceptor';

// Services
import { AuthGuard } from './guards/auth.guard';
import {
    ApiService,
    ProfileService,
    UserService,
    FreelanceService,
    MissionsService,
    CompanyService,
    NotificationService,
    StrongBoxService,
    AgentService} from './services';
import { JwtInterceptor, ErrorInterceptor } from './interceptors';
import { userProviderFactory } from './providers/userProviderFactory';
import { SentryErrorHandler } from './interceptors/sentry.interceptor';
import { environment } from '@env/environment';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        HttpModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            closeButton: true,
            tapToDismiss: true
        }),
    ],
})
export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
            'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
          ngModule: CoreModule,
          providers: [
            AuthGuard,
            ApiService, ProfileService, UserService, FreelanceService, MissionsService,
            CompanyService, NotificationService, StrongBoxService, AgentService,
          { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
          { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
          { provide: APP_INITIALIZER, useFactory: userProviderFactory, deps: [UserService], multi: true },
          LoaderService,
              { provide: HTTP_INTERCEPTORS,
                  useClass: LoaderInterceptor,
                  multi: true
              },
            { provide: ErrorHandler, useClass: environment.appEnv === 'development' ? ErrorHandler : SentryErrorHandler },
          ]
        };
    }
}

