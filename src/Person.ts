import { Hand } from "./Hand";

export class Person {
    constructor(
        public hand: Hand = new Hand()
    ) {}
}