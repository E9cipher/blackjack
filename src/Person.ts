import { Hand } from "./Hand";

/**
 * Defines a Person
 */
export class Person {
    constructor(
        /** The hand this Person has */
        public hand: Hand = new Hand()
    ) {}
}