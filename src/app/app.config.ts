import { tokenInterceptor } from './services/token.interceptor';
import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt)

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { registerLocaleData } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withInterceptors([tokenInterceptor])), provideAnimations(), provideToastr(), {provide: LOCALE_ID, useValue: 'pt-BR'}, provideAnimationsAsync(), provideNativeDateAdapter()]
};
