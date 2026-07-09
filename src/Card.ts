export type Suit = "♠️" | "❤️" | "♦️" | "♣️";

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

export const CARD_VALUES: Record<Rank, number> = {
  "A": 11,
  "2": 2, "3": 3, "4": 4, "5": 5, "6": 6,
  "7": 7, "8": 8, "9": 9,
  "10": 10, "J": 10, "Q": 10, "K": 10,
};

export const SUITS: Suit[] = ["♠️", "❤️", "♦️", "♣️"];
export const RANKS: Rank[] = Object.keys(CARD_VALUES) as Rank[];

export class Card {
    constructor(
        public readonly suit: Suit,
        public readonly rank: Rank
    ) {}

    toString(): string {
        return `${this.rank}${this.suit}`;
    }

    getValue(): number {
        return CARD_VALUES[this.rank]
    }
}