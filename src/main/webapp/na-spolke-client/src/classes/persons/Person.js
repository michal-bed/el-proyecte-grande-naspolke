
export class Person{
    FirstName;
    SecondName;
    LastNameI;
    LastNameII;
    constructor(personData) {
        this.FirstName = personData.imiona.imie;
        this.SecondName = personData.imiona.imieDrugie;
        this.LastNameI = personData.nazwisko.nazwiskoICzlon;
        this.LastNameII = personData.nazwisko.nazwiskoIICzlon;
    }
}