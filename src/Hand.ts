import { Card, CARD_VALUES } from "./Card";

export class Hand {
    constructor(
        public cards: Card[] = []
    ) { }

    addCard(card: Card) {
        this.cards = this.cards.concat(card);
        return this.cards;
    }

    reset(): void {
        this.cards = []
    }

    get value(): number {
        let total = 0;
        let aceCount = 0;
        this.cards.forEach(card => {
            if (card.rank === "A") aceCount += 1;
            total += card.getValue();
        })
        while (total > 21 && aceCount > 0) {
            total -= 10;
            aceCount -= 1;
        }
        return total;
    }

    /** Checks if the currrent hand busted (>21)
     * @returns {boolean} true if the player busted, false otherwise
     */
    get isBust(): boolean {
        return this.value > 21;
    }

    get isBlackjack(): boolean {
        return this.cards.length === 2 && this.value === 21; 
    }
}