import { Injectable } from '@angular/core';

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
}

@Injectable()
export class PersonsService {
  public persons: Person[] = [];
  private lastId: number = 1;

  constructor() {
    this.addPerson({id: 1, firstName: "Andy", lastName: "Ender"})
  }

  addPerson(person: Person) {
    person.id = this.lastId++;
    this.persons.push(person);
  }

  updatePerson(person: Person) {
    this.persons = this.persons.map((_person, index) => {
      return (_person.id === person.id) ? person : _person;
    });
  }

}
