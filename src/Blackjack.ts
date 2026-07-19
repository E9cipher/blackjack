import { Dealer } from "./Dealer";
import { Deck } from "./Deck";
import { Hand } from "./Hand";
import { Person } from "./Person";
import { Player } from "./Player";
import { Outcome } from "./Enums";

/**
 * The main game logic for Blackjack. Handles the deck, dealer, and players.
 */
export class Blackjack {
    /** The deck that will be used in the game */
    private deck: Deck;
    /** The dealer player */
    private dealer: Dealer;
    /** The normal players */
    private players: Player[];

    constructor(players: Player[]) {
        this.deck = new Deck();
        this.dealer = new Dealer();
        this.players = players;
    }

    /**
     * Deals a random card from the deck to a specified Person
     * @param person the whom to deal the card to
     */
    private dealCard(person: Person) {
        person.hand.addCard(this.deck.draw());
    }

    /**
     * Start a blackjack round.
     */
    startRound(): void {
        this.deck.shuffle(); // shuffle
        this.dealer.hand.reset(); // reset dealer's hand
        this.players.forEach(p => {
            p.hand.reset() // reset player's hand
            p.isDone = false; // reset isDone
        });
        let i = 0; // deal cards
        while (i < 2) {
            // 2 cards
            this.players.forEach(p => this.dealCard(p));
            this.dealCard(this.dealer);
            i++;
        }
    }

    /**
     * Draw a card to a player, and check if it busts
     * 
     * @param player - the player in question
     * @returns {boolean} false if the player busted, true otherwise
     */
    playerHit(player: Player): boolean {
        this.dealCard(player);
        return !player.hand.isBust ? true : (player.isDone = true, false);
    }

    /**
     * Stand a player
     * 
     * @param player - the player in question
     */
    playerStand(player: Player): void {
        player.isDone = true;
    }

    /**
     * Play the dealer's turn
     *  @returns {boolean} true if the dealer busted, false otherwise
     */
    dealerPlay(): boolean {
        while (this.dealer.shouldHit()) this.dealCard(this.dealer);
        return this.dealer.hand.isBust;
    }

    /**
     * Resolves this round and returns the Outcome
     * @param player - the player in question
     * @returns the {@link Outcome} of this round
     */
    resolveRound(player: Player): Outcome {
        if (player.hand.isBust) return Outcome.DealerWin
        else if (player.hand.isBlackjack && !this.dealer.hand.isBlackjack) return Outcome.PlayerBlackjack;
        else if (this.dealer.hand.isBust && !player.hand.isBust) return Outcome.PlayerWin;
        else if (player.hand.value > this.dealer.hand.value) return Outcome.PlayerWin;
        else if (player.hand.value < this.dealer.hand.value) return Outcome.DealerWin;
        else return Outcome.Push;
    }

    /**
     * Pays the respective amount of money to the players based on the Outcome
     * 
     * @param player - the player in question
     * @param outcome the {@link Outcome} of the result
     */
    private payout(player: Player, outcome: Outcome): void {
        switch (outcome) {
            case Outcome.PlayerBlackjack: player.win(1.5); break;
            case Outcome.PlayerWin: player.win(1); break;
            case Outcome.Push: player.push(); break;
            case Outcome.DealerWin: player.lose(); break;
        }
    }

    /**
     * Handles post-round payment
     * 
     * @param player - the player in question
     * @returns the {@link Outcome} of this round
     */
    round(player: Player): Outcome {
        const outcome = this.resolveRound(player);
        this.payout(player, outcome);
        return outcome;
    }

    /**
     * Get the dealer's true hand
     * 
     * @returns the dealer hand
     */
    get dealerHand(): Hand {
        return this.dealer.hand;
    }
}