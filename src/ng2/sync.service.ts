import { Injectable, Inject, NgZone, ApplicationRef } from '@angular/core';
import 'rxjs/Rx';

import { OptionsService } from "./options.service";

@Injectable()
export class SyncService {
  private oldValues = {
    optionsService: {},
    ng1dataFormatService: {}
  };

  constructor(@Inject('dataFormat') public ng1dataFormatService,
              public optionsService: OptionsService,
              private zone: NgZone,
              private appRef: ApplicationRef) {

    this.fillOldValues();

    zone.onMicrotaskEmpty.subscribe({
      next: () => {
        console.log("Change detection...");
        if (this.detectChanges()) {
          console.log("Changes detected");
          this.zone.run(() => appRef.tick());
        }
      }
    });
  }

  private detectChanges() {
    let changed = false;

    if (this.detectSimpleChange('optionsService', 'lastNameFirst')) {
      this.ng1dataFormatService.format = this.optionsService.lastNameFirst ?
        'last_first' : 'first_last';
      changed = true;
    }

    if (this.detectSimpleChange('ng1dataFormatService', 'format')) {
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
      this.fillOldValues();
    }

    return changed;
  }

  private detectSimpleChange(service: string, field: string) {
    return (this.oldValues[service][field] !== this[service][field]);
  }

  private fillOldValues() {
    this.oldValues.optionsService = {
      lastNameFirst: this.optionsService.lastNameFirst
      // note that deep copy may be needed for objects
    };

    this.oldValues.ng1dataFormatService = {
      format: this.ng1dataFormatService.format
      // note that deep copy may be needed for objects
    };
  }

}
