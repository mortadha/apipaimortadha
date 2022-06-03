import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule, EventEmitter } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { CoreModule } from '@app/core/core.module';

// Components
import { AppComponent } from './app.component';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Localization
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    AppRoutingModule,
  ],
  exports: [
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
