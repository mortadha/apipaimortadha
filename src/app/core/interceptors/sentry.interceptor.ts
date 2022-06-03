import { ErrorHandler, Injectable } from '@angular/core';

import * as Sentry from '@sentry/browser';
import { environment } from '@env/environment';

const isDev = (environment.appEnv === 'development');

if (isDev === false) {
  Sentry.init({
    dsn: 'https://fa45face390e477fa5b9d5c04b3d49c4@sentry.io/1439020',
    environment: environment.appEnv,
  });
}

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    if (isDev === false && error.status !== 0) {
      const eventId = Sentry.captureException(error.originalError || error);
      Sentry.showReportDialog({ eventId });
    }
  }
}
