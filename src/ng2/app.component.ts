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

  createNew() {
    this.editingPerson = {
      id: 0,
      firstName: "",
      lastName: ""
    };
  }

  startEdit(person: Person) {
    this.editingPerson = Object.assign({}, person);
    this.zone.run(() => {});
  }

  onApply() {
    if (this.editingPerson.id) {
      this.personsService.updatePerson(this.editingPerson);
    } else {
      this.personsService.addPerson(this.editingPerson);
    }
    this.resetEditingPerson();
  }

  onCancel() {
    this.resetEditingPerson();
  }

  private resetEditingPerson() {
    this.editingPerson = null;
  }

}
