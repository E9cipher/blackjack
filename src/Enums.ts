/**
 * Possible menu choices
 */
export enum MenuChoice {
    /** Play the game */
    Game,
    /** See current balance */
    Balance,
    /** Go to Settings */
    Settings,
    /** Invalid choice */
    Invalid,
    /** Exit app */
    Exit
}

/**
 * Possible blackjack Outcomes
 */
export enum Outcome {
    /** The player wins */
    PlayerWin,
    /** Dealer wins */
    DealerWin,
    /** Tie */
    Push,
    /** Player wins by a blackjack */
    PlayerBlackjack
}