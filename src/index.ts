import * as readline from 'node:readline/promises'
import { Player } from './Player';
import { Blackjack, Outcome } from './Blackjack';
import { Hand } from './Hand';
import { MenuChoice } from './Enums';
import { exit } from 'node:process';
import { time } from 'node:console';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function printHand(label: string, hand: Hand): string {
    return (`${label}: ${hand.cards.map(c => c.toString()).join("  ")}  . Sum: ${hand.value}`);
}

function printHiddenDealerHand(hand: Hand): string {
    return (`${hand.cards[0]}  ??`);
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function menu(): Promise<MenuChoice> {
    console.clear();
    console.log(`Avaliable options:
    1) Game
    2) Balance
    3) Settings
    4) Exit
    `);
    const answer = await rl.question("Choose an option: ");
    switch (answer) {
        case '1':
            return MenuChoice.Game;
        case '2':
            return MenuChoice.Balance;
        case '3':
            return MenuChoice.Settings
        case '4':
            return MenuChoice.Exit
        default:
            return MenuChoice.Invalid
    }
}

async function game(player: Player, blackjack: Blackjack): Promise<void> {
    let amount: number = 0;
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
        console.log(`${printHand("PLAYER: ", player.hand)} . \nDEALER: ${printHiddenDealerHand(blackjack.dealerHand)}`);
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
            console.log(`${printHand("CURRENT HAND: ", player.hand)}  Sum: ${player.hand.value}`);
        }

        /** Dealer's turn */
        if (!player.hand.isBust) {
            blackjack.dealerPlay();
        }

        console.log(printHand("DEALER hand: ", blackjack.dealerHand) + `  Sum: ${blackjack.dealerHand.value}`);

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
}

async function main(): Promise<void> {
    const player = new Player(100);
    const blackjack = new Blackjack([player]);

    /** Greeting */
    console.log("Welcome.");
    while (true) {
        /** Menu */
        let choice = await menu();
        while (choice === MenuChoice.Invalid) {
            choice = await menu();
        }

        switch (choice) {
            case MenuChoice.Game:
                await game(player, blackjack);
            case MenuChoice.Balance:
                console.log(`Your current balance is: ${player.chips}`);
                await sleep(1500);
                break;
            case MenuChoice.Settings:
                console.log(`Settings not avaliable yet.`)
                break;
            case MenuChoice.Exit:
                console.log("Bye!");
                rl.close();
                exit();
        }
    }
}

// Main logic
main().catch(err => {
    console.log(`\nSomething went wrong: ${err}`);
    rl.close();
})