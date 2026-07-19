import { Person } from "./Person";

/**
 * Defines the dealer
 */
export class Dealer extends Person {
    // Constructor comes from Person
    /**
     * Whether the dealer should hit or not
     * @returns true if the hand value is greater than 17, false otherwise
     */
    shouldHit(): boolean {
        return this.hand.value < 17
    }
}