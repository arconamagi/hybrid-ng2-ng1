import { Injectable } from '@angular/core';

/**
 * Interface for a person
 */
export interface Person {
  id: number;
  firstName: string;
  lastName: string;
}

/**
 * This service stores a list of persons and allows to add and modify persons
 * in this list. It also adds one default record during the initialization.
 */
@Injectable()
export class PersonsService {
  /**
   * The list of persons
   */
  public persons: Person[] = [];
  /**
   * Identifier used when adding a new person
   */
  private lastId: number = 1;

  constructor() {
    this.addPerson({id: 1, firstName: "Andy", lastName: "Ender"})
  }

  /**
   * Adds specified person to persons list
   */
  addPerson(person: Person) {
    person.id = this.lastId++;
    this.persons.push(person);
  }

  /**
   * Updated specified person, person.id is used to determine person to update
   */
  updatePerson(person: Person) {
    this.persons = this.persons.map((_person, index) => {
      return (_person.id === person.id) ? person : _person;
    });
  }

}
