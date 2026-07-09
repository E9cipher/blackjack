import { Card, RANKS, SUITS } from "./Card";

export class Deck {
    private cards: Card[]
    constructor(cards: Card[] = Deck.buildFullDeck()) {
        this.cards = cards;
    }

    private static buildFullDeck(): Card[] {
        const cards: Card[] = [];
        for (const suit of SUITS) {
            for (const rank of RANKS) {
                cards.push(new Card(suit, rank));
            }
        }
        return cards;
    }

    shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // flip the cards
        }
    }

    draw(): Card {
        const card = this.cards.pop();
        if (!card) throw new Error("Cannot draw from empty deck!");
        return card;
    }

    get remaining(): number {
        return this.cards.length;
    }
}