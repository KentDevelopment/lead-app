import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { Environment } from '@environments/environment'
import { AppModule } from './app/app.module'

if (Environment.production) {
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)
