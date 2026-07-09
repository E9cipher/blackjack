import * as readline from 'node:readline/promises'
import { Player } from './Player';
import { Blackjack, Outcome } from './Blackjack';
import { Hand } from './Hand';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function printHand(label: string, hand: Hand): string {
    return (`${label}: ${hand.cards.map(c => c.toString()).join("  ")}`)
}

function printHiddenDealerHand(hand: Hand): string {
    return (`${hand.cards[0]}  ??`);
}

async function main() {
    let amount: number = 0;
    const player = new Player(100);
    const blackjack = new Blackjack([player]);
    let playAgain = true;

    do {
        /** Bet prompting logic */
        while (true) {
            const rawChips = await rl.question("How many chips do you want to bet? ");
            amount = Number(rawChips);
            if (isNaN(amount) || amount <= 0 || !Number.isInteger(amount)) {
                console.log(`Not a valid number: ${rawChips} . Only positive integers are allowed`);
                continue;
            }
            if (!player.placeBet(amount)) {
                console.log(`Cannot bet more chips than you have. Bet: ${amount} , chips: ${player.chips}`);
                continue;
            }
            break;
        }

        /** Start blackjack round */
        blackjack.startRound();
        console.log(`${printHand("PLAYER: ", player.hand)} . DEALER: ${printHiddenDealerHand(blackjack.dealerHand)}`);
        while (!player.isDone) {
            const ans = await rl.question("(h)it or (s)tand? ");
            switch (ans) {
                case "h":
                    const hit = blackjack.playerHit(player);
                    if (!hit) {
                        // player busted
                        player.isDone = true;
                    }
                    break;
                case "s":
                    blackjack.playerStand(player);
                    break;
                default:
                    console.log(`Invalid choice: ${ans}`);
                    continue;
            }
            console.log(`CURRENT HAND: ${printHand("", player.hand)}. Sum: ${player.hand.value}`);
        }

        /** Dealer's turn */
        if (!player.hand.isBust) {
            blackjack.dealerPlay();
        }

        console.log(printHand("DEALER hand: ", blackjack.dealerHand) + `Sum: ${blackjack.dealerHand.value}`);

        const outcome = blackjack.round(player);
        let msg: string;
        switch (outcome) {
            case Outcome.DealerWin:
                msg = "Dealer won!";
                break;
            case Outcome.PlayerBlackjack:
                msg = "You have a Blackjack! Player wins";
                break;
            case Outcome.PlayerWin:
                msg = "You won!";
                break;
            case Outcome.Push:
                msg = "Push! This is a tie";
                break;
        }
        console.log(`RESULT: ${msg}`);

        /** Out of chips! */
        if (player.chips <= 0) {
            console.log("Game Over! You're out of chips");
            playAgain = false;
        } else {
            console.log(`Your current balance is: ${player.chips}`);
            // Play Again?
            playAgain = (await rl.question("Play Again? (y/N) ")).toLowerCase() === "y";
        }        

    } while (playAgain)
        console.log("Bye!");

    rl.close();
}

// Main logic
main().catch(err => {
    console.log(`\nSomething went wrong: ${err}`);
    rl.close();
})