import { Injectable } from '@angular/core';
import { SyncService } from "./sync.service";

@Injectable()
export class OptionsService {
  public lastNameFirst: boolean = false;

  constructor() {
  }
}
