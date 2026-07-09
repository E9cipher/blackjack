import { Person } from "./Person";

export class Dealer extends Person {
    // Constructor comes from Person
    shouldHit(): boolean {
        return this.hand.value < 17
    }
}