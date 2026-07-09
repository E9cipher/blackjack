import { Dealer } from "./Dealer";
import { Deck } from "./Deck";
import { Hand } from "./Hand";
import { Person } from "./Person";
import { Player } from "./Player";

export enum Outcome {
    PlayerWin,
    DealerWin,
    Push,
    PlayerBlackjack
}

export class Blackjack {
    private deck: Deck;
    private dealer: Dealer;
    private players: Player[];

    constructor(players: Player[]) {
        this.deck = new Deck();
        this.dealer = new Dealer();
        this.players = players;
    }

    private dealCard(person: Person) {
        person.hand.addCard(this.deck.draw());
    }

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

    /** Draw a card to a player, and check if it busts
     * @param {Player} player
     * @returns {boolean} false if the player busted, true otherwise
     */
    playerHit(player: Player): boolean {
        this.dealCard(player);
        return !player.hand.isBust ? true : (player.isDone = true, false);
    }

    /** Stand a player
     * @param {Player} player
     */
    playerStand(player: Player): void {
        player.isDone = true;
    }

    /** Play the dealer's turn
     *  @returns {boolean} true if the dealer busted, false otherwise
     */
    dealerPlay(): boolean {
        while (this.dealer.shouldHit()) this.dealCard(this.dealer);
        return this.dealer.hand.isBust;
    }

    resolveRound(player: Player): Outcome {
        if (player.hand.isBust) return Outcome.DealerWin
        else if (player.hand.isBlackjack && !this.dealer.hand.isBlackjack) return Outcome.PlayerBlackjack;
        else if (this.dealer.hand.isBust && !player.hand.isBust) return Outcome.PlayerWin;
        else if (player.hand.value > this.dealer.hand.value) return Outcome.PlayerWin;
        else if (player.hand.value < this.dealer.hand.value) return Outcome.DealerWin;
        else return Outcome.Push;
    }

    private payout(player: Player, outcome: Outcome): void {
        switch (outcome) {
            case Outcome.PlayerBlackjack: player.win(1.5); break;
            case Outcome.PlayerWin: player.win(1); break;
            case Outcome.Push: player.push(); break;
            case Outcome.DealerWin: player.lose(); break;
        }
    }

    round(player: Player): Outcome {
        const outcome = this.resolveRound(player);
        this.payout(player, outcome);
        return outcome;
    }

    get dealerHand(): Hand {
        return this.dealer.hand;
    }
}