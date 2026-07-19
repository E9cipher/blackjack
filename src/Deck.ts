import { Card, RANKS, SUITS } from "./Card";

/**
 * Defines the Deck
 */
export class Deck {
    /** The cards in this deck */
    private cards: Card[];
    constructor(
        /** The cards in this deck. Automatically set */
        cards: Card[] = Deck.buildFullDeck()
    ) {
        this.cards = cards;
    }

    /**
     * Builds the full deck. NOT randomized!
     * @returns an array of 52 cards building the deck
     */
    private static buildFullDeck(): Card[] {
        const cards: Card[] = [];
        for (const suit of SUITS) {
            for (const rank of RANKS) {
                cards.push(new Card(suit, rank));
            }
        }
        return cards;
    }

    /**
     * Shuffles the deck using Fisher-Yates algorithm
     */
    shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // flip the cards
        }
    }

    /**
     * Draws a card from the deck
     * @returns the {@link Card} drawn
     */
    draw(): Card {
        const card = this.cards.pop();
        if (!card) throw new Error("Cannot draw from empty deck!");
        return card;
    }

    /** Returns the remaining cards in the deck */
    get remaining(): number {
        return this.cards.length;
    }
}