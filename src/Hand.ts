import { Card, CARD_VALUES } from "./Card";

/**
 * Defines a Hand
 */
export class Hand {
    constructor(
        /** The cards in this hand */
        public cards: Card[] = []
    ) {}

    /**
     * Adds a specified card to the current Hand, returns the new Hand
     * @param card - the card to add to the Hand
     * @returns the new Hand
     */
    addCard(card: Card) {
        this.cards = this.cards.concat(card);
        return this.cards;
    }

    /**
     * Resets the hand
     */
    reset(): void {
        this.cards = []
    }

    /**
     * Returns the total value of the hand. Handles Aces
     */
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

    /**
     * Checks if the currrent hand busted (>21)
     * 
     * @returns {boolean} true if the player busted, false otherwise
     */
    get isBust(): boolean {
        return this.value > 21;
    }

    /**
     * Returns true if the Hand is a blackjack, false otherwise
     */
    get isBlackjack(): boolean {
        return this.cards.length === 2 && this.value === 21; 
    }
}