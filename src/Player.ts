import { Person } from "./Person";

export class Player extends Person {
    constructor(
        public chips: number, // change to chips/money logic later?
        public bet: number = 0,
        public isDone: boolean = false
    ) {
        super();
    }

    /** Places a bet. Returns true if successful, false otherwise
     * @param {number} amount
     */
    placeBet(amount: number): boolean {
        if (amount <= 0 || amount > this.chips) return false;
        this.bet += amount;
        this.chips -= amount;
        return true
    }

    win(mult: number = 1): void {
        this.chips += this.bet + this.bet * mult;
        this.bet = 0;
    }

    lose(): void {
        // Logic already handled by placeBet
        this.bet = 0;
    }

    push(): void {
        this.chips += this.bet;
        this.bet = 0;
    }
}