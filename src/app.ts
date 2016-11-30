import {
  NgModule,
  forwardRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeAdapter } from '@angular/upgrade';
import { UpgradeModule } from '@angular/upgrade/static';
declare let angular: any;
import 'ng1app';

import { AppComponent }  from './ng2/app.component';
import { PersonsService } from "./ng2/persons.service";
import { OptionsService } from "./ng2/options.service";
import { SyncService } from "./ng2/sync.service";

/*
 * Create upgradeAdapter
 */
export const upgradeAdapter: UpgradeAdapter = new UpgradeAdapter(
  forwardRef(() => Ng2AppModule));

/*
 * Expose ng2 content to ng1
 */
angular.module('ng1app')
  .directive('ng2app', upgradeAdapter.downgradeNg2Component(AppComponent))
  .factory('personsService', upgradeAdapter.downgradeNg2Provider(PersonsService));

/*
 * Expose ng1 content to ng2
 */
upgradeAdapter.upgradeNg1Provider('dataFormat');

/*
 * Define a root module with upgraded service and component
 */
@NgModule({
  declarations: [
    AppComponent,
    upgradeAdapter.upgradeNg1Component('ng1appForm')
  ],
  imports: [
    CommonModule,
    BrowserModule,
    UpgradeModule
  ],
  providers: [
    PersonsService,
    OptionsService,
    SyncService,
  ]
})
class Ng2AppModule {
  constructor(syncService: SyncService) {
    // Note: SyncService should be injected here in order to get it working
  }
  ngDoBootstrap() {
  }
}

/*
 * Bootstrap the App
 * Note: The root of the application is always an Angular 1 template.
 */
upgradeAdapter.bootstrap(document.body, ['ng1app']);

