import { Injectable } from '@angular/core';
import { SyncService } from "./sync.service";

/**
 * Just a simple service which stores `lastNameFirst` variable.
 * It is synchronized with AngularJS `dataFormat` service (check `SyncService`).
 */
@Injectable()
export class OptionsService {
  public lastNameFirst: boolean = false;

  constructor() {
  }
}
