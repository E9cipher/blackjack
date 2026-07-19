/** Possible card suits */
export type Suit = "♠️" | "❤️" | "♦️" | "♣️";

/** Possible card ranks */
export type Rank =
    | "A"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "J"
    | "Q"
    | "K";

/**
 * A record mapping the {@link Rank} and the value of a card. Ace is 11
 */
export const CARD_VALUES: Record<Rank, number> = {
  "A": 11,
  "2": 2, "3": 3, "4": 4, "5": 5, "6": 6,
  "7": 7, "8": 8, "9": 9,
  "10": 10, "J": 10, "Q": 10, "K": 10,
};

export const SUITS: Suit[] = ["♠️", "❤️", "♦️", "♣️"];
export const RANKS: Rank[] = Object.keys(CARD_VALUES) as Rank[];

/**
 * Defines a Card
 */
export class Card {
    constructor(
        /** The card's suit */
        public readonly suit: Suit,
        /** The card's rank */
        public readonly rank: Rank
    ) {}

    /**
     * Returns the card in a human-readable format
     * @returns a string with the rank and suit (e.g A♠️)
     */
    toString(): string {
        return `${this.rank}${this.suit}`;
    }

    /**
     * Returns the value of the card
     * @returns the value of the card
     */
    getValue(): number {
        return CARD_VALUES[this.rank]
    }
}