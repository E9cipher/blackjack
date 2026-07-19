import { Person } from "./Person";

export class Player extends Person {
    constructor(
        /** Player balance */
        public chips: number, // change to chips/money logic later?
        /** Player's current bet */
        public bet: number = 0,
        /** Whether the player is done playing or not */
        public isDone: boolean = false
    ) {
        super();
    }

    /**
     * Places a specified chips bet. Subtracts the chips directly from player balance.
     * @param amount - the amount to bet.
     * @returns {boolean} true if the bet could be placed, false otherwise.
     */
    placeBet(amount: number): boolean {
        if (amount <= 0 || amount > this.chips) return false;
        this.bet += amount;
        this.chips -= amount;
        return true
    }

    /**
     * Gives the player an amount of money
     * @param mult the multiplier to apply to the wins
     */
    win(mult: number = 1): void {
        this.chips += this.bet + this.bet * mult;
        this.bet = 0;
    }

    /**
     * Resets the player bet to 0. See {@link placeBet}
     */
    lose(): void {
        this.bet = 0;
    }

    /**
     * Returns the bet money to the player and resets it to 0
     */
    push(): void {
        this.chips += this.bet;
        this.bet = 0;
    }
}