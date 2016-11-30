import { Component, NgZone } from '@angular/core';

import { PersonsService, Person } from "./persons.service";
import { OptionsService } from "./options.service";

@Component({
  moduleId: __moduleName,
  selector: 'ng2app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public editingPerson: Person;

  constructor(public personsService: PersonsService,
              public optionsService: OptionsService,
              private zone: NgZone) {
    this.resetEditingPerson();
  }

  /**
   * Fills `editingPerson` var with a new person info.
   * This will show ng1app-form.
   */
  createNew() {
    this.editingPerson = {
      id: 0,
      firstName: "",
      lastName: ""
    };
  }

  /**
   * Fills `editingPerson` var with a specified person.
   * This will show ng1app-form.
   */
  startEdit(person: Person) {
    this.editingPerson = Object.assign({}, person);
    // TODO fix dirty hack: force change detection
    // without this hack it sometimes stops responding on 'Edit' buttons click
    this.zone.run(() => {});
  }

  /**
   * An event handler for 'Apply' button on ng1app-form.
   * Adds a new person to the list or updates existing person and
   * hides the form.
   */
  onApply() {
    if (this.editingPerson.id) {
      this.personsService.updatePerson(this.editingPerson);
    } else {
      this.personsService.addPerson(this.editingPerson);
    }
    this.resetEditingPerson();
  }

  /**
   * An event handler for 'Cancel' button on ng1app-form.
   * Hides the form.
   */
  onCancel() {
    this.resetEditingPerson();
  }

  /**
   * Nullifies `editingPerson` - this will hide ng1app-form.
   */
  private resetEditingPerson() {
    this.editingPerson = null;
  }

}
