import { Injectable, Inject, NgZone } from '@angular/core';

import { OptionsService } from "./options.service";

/**
 * This service synchronizes values between two sample AngularJS and Angular 2
 * services - `dataFormat` (ng1 service) and `OptionsService` (ng2 service).
 * Synchronization occurs when any change happens in Angular 2 zone.
 * For this purpose `NgZone` is injected and its `onMicrotaskEmpty` event is used.
 */
@Injectable()
export class SyncService {
  /**
   * The store for an old values of synchronized services fields.
   * Used to detect changes.
   */
  private oldValues = {
    optionsService: {},
    ng1dataFormatService: {}
  };

  constructor(@Inject('dataFormat') public ng1dataFormatService,
              public optionsService: OptionsService,
              private zone: NgZone) {
    this.storeOldValues();

    zone.onMicrotaskEmpty.subscribe(() => {
      console.log("Change detection...");
      if (this.sync()) {
        console.log("Changes detected");
        this.zone.run(() => {});
      }
    });
  }

  /**
   * Compares old and current service values.
   * @param service - name of injected service variable ('optionsService' or 'ng1dataFormatService')
   * @param field - name of the service's field to check changes
   */
  private isChanged(service: string, field: string): boolean {
    return (this.oldValues[service][field] !== this[service][field]);
  }

  /**
   * Stores a current service's values into oldValues var.
   * Just a simple copying is made, deep copy may be needed for objects.
   */
  private storeOldValues() {
    this.oldValues.optionsService = {
      lastNameFirst: this.optionsService.lastNameFirst
      //
    };

    this.oldValues.ng1dataFormatService = {
      format: this.ng1dataFormatService.format
    };
  }

  /**
   * Checks if any changes occur in optionsService's or ng1dataFormatService's
   * fields and synchronizes their values if needed.
   * @return true if any change occurred, false otherwise
   */
  private sync(): boolean {
    let changed = false;

    if (this.isChanged('optionsService', 'lastNameFirst')) {
      this.ng1dataFormatService.format = this.optionsService.lastNameFirst ?
        'last_first' : 'first_last';
      changed = true;
    } else if (this.isChanged('ng1dataFormatService', 'format')) {
      switch (this.ng1dataFormatService.format) {
        case 'first_last':
          this.optionsService.lastNameFirst = false;
          break;
        case 'last_first':
          this.optionsService.lastNameFirst = true;
          break;
      }
      changed = true;
    }

    if (changed) {
      this.storeOldValues();
    }

    return changed;
  }

}
