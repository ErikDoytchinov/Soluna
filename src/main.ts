import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import fetch from 'node-fetch';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
