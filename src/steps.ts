export type Step = {
  id: number;
  title: string;
  instructions: string;
  starterCode: string;
  solutionCode: string;
};

const step1Code = `kaplay();

loadBean();

add([
    sprite("bean"),
    pos(120, 80),
]);
`;

const step1Instructions = `Welcome! You're about to make your very first thing show up on a game screen — a little character named Bean.

Look at the box on the right, labeled "Run your code" — that's where your game will appear once you click the Run button up above.

The box in the middle already has some code typed in for you. Here's what each line does, in plain English:

- \`kaplay();\` — this line turns everything on. Think of it like flipping the power switch before you can do anything else. Every step in these lessons will start with this line.
- \`loadBean();\` — this tells the computer to get a little cartoon character named Bean ready to use. Bean comes built into this tool, so you don't have to draw anything or find a picture yourself.
- \`add([...])\` — this places something onto the screen. The two lines inside the square brackets describe what to place and where:
  - \`sprite("bean")\` means "put the Bean picture here."
  - \`pos(120, 80)\` means "put it 120 steps over from the left, and 80 steps down from the top."

Click Run now and watch Bean appear in the box on the right.

Once you see Bean on screen, try this: change the two numbers in \`pos(120, 80)\` to something else, like \`pos(300, 200)\`, then click Run again. Bean will show up in a new spot. Try a few different numbers and see what happens.

Don't worry about breaking anything — there's no way to mess this up permanently. If your screen ever goes blank or shows an error, just click "Reset to working code" up above and you'll be right back to a version that works.`;

const step2Code = `kaplay();

loadBean();

const SPEED = 320;

const player = add([
    sprite("bean"),
    pos(120, 80),
]);

onKeyDown("left", () => {
    player.move(-SPEED, 0);
});

onKeyDown("right", () => {
    player.move(SPEED, 0);
});

onKeyDown("up", () => {
    player.move(0, -SPEED);
});

onKeyDown("down", () => {
    player.move(0, SPEED);
});
`;

const step2Instructions = `Bean is standing still right now — this step gets him moving across the screen using the arrow keys on your keyboard.

The box in the middle now has some new code. Here's what's new, in plain English:

- \`const player = add([...])\` — this is the same \`add([...])\` line from before, but now we're putting a name tag on the bean called \`player\`, so the lines below can say "move player" instead of us having to point at it every time.
- \`const SPEED = 320;\` — this is a labeled box holding a number. Right now it holds 320. Keeping the speed in one labeled box means if you want Bean to move faster or slower later, you only have to change it in one place instead of four.
- \`onKeyDown("left", () => { player.move(-SPEED, 0); });\` — this is code that runs over and over, once per instant, for as long as the left arrow key is being held down. Inside it, \`player.move(-SPEED, 0)\` tells Bean how far to move sideways and how far to move up or down — a negative number here means "move left." The other three blocks below it work the same way, just for the right, up, and down keys, using positive or negative numbers to match each direction.

Click Run, then click once inside the box on the right so it's paying attention to your keyboard, then press the arrow keys and watch Bean move around.

Once that's working, try changing 320 to something small like 50, or something big like 800, and click Run again to see Bean move slower or faster.

If the arrow keys don't do anything, make sure you clicked inside the preview box first, and double check all four \`onKeyDown\` lines are spelled exactly as shown, including the capital K and D.

Nothing here can break permanently — click "Reset to working code" any time to get back to a working version, or click "Show me the answer" if you want to see the finished code.`;

const step3Code = `kaplay();

loadBean();

const SPEED = 320;

const player = add([
    sprite("bean"),
    pos(120, 80),
    area(),
]);

onKeyDown("left", () => {
    player.move(-SPEED, 0);
});

onKeyDown("right", () => {
    player.move(SPEED, 0);
});

onKeyDown("up", () => {
    player.move(0, -SPEED);
});

onKeyDown("down", () => {
    player.move(0, SPEED);
});

add([
    circle(16),
    color(255, 200, 0),
    pos(360, 200),
    area(),
    "coin",
]);

player.onCollide("coin", (coin) => {
    destroy(coin);
});
`;

const step3Instructions = `Bean can already move around — now let's give him something to bump into: a gold coin that disappears when he touches it.

Here's what's new in the code:

- \`area()\` — added to the bean's own list of things. This gives Bean a sense of touch, so the game can tell when he bumps into something else. Without it, things could sit right on top of each other on screen and the game would never notice.
- The new \`add([...])\` block near the bottom makes a plain gold circle instead of a picture. \`circle(16)\` means "draw a circle 16 steps wide." \`color(255, 200, 0)\` colors it using three numbers for how much red, green, and blue light to mix in — this particular mix makes a gold/yellow color. \`pos(360, 200)\` places it, the same idea as Bean's own \`pos(...)\`.
- \`"coin"\` written by itself in that list sticks a name tag of "coin" onto the circle, so other code can talk about "the thing tagged coin" without needing to know exactly which object that is. The circle also gets its own \`area()\` so it can be bumped into.
- \`player.onCollide("coin", (coin) => { destroy(coin); });\` — this runs the moment Bean touches anything tagged coin. \`destroy(coin)\` erases that thing from the screen for good.

Click Run, click inside the preview box, and walk Bean into the gold circle using the arrow keys. Watch it disappear the moment he touches it.

Try changing \`pos(360, 200)\` to move the coin somewhere else, or change the color numbers — try \`color(0, 200, 255)\` for a blue coin instead.

If walking into the circle does nothing, check that both Bean's list and the circle's list include \`area()\`, and that \`"coin"\` is spelled the same way, quote marks and all, in both places.

As always, "Reset to working code" undoes any mess, and "Show me the answer" shows a working version if you get stuck.`;

const step4Code = `kaplay();

loadBean();

const SPEED = 320;

const player = add([
    sprite("bean"),
    pos(120, 80),
    area(),
]);

onKeyDown("left", () => {
    player.move(-SPEED, 0);
});

onKeyDown("right", () => {
    player.move(SPEED, 0);
});

onKeyDown("up", () => {
    player.move(0, -SPEED);
});

onKeyDown("down", () => {
    player.move(0, SPEED);
});

add([
    circle(16),
    color(255, 200, 0),
    pos(360, 200),
    area(),
    "coin",
]);

let score = 0;

const scoreLabel = add([
    text("Score: 0"),
    pos(12, 12),
]);

player.onCollide("coin", (coin) => {
    destroy(coin);
    score = score + 1;
    scoreLabel.text = "Score: " + score;
});
`;

const step4Instructions = `Bean can collect the coin now — this step adds a score in the corner that goes up each time he does.

Here's what's new:

- \`let score = 0;\` — this is a labeled box too, but different from \`SPEED\` before: \`const\` is for a number that never changes, while \`let\` is for one that's allowed to change later. \`score\` starts at 0 and will go up as Bean collects coins.
- \`const scoreLabel = add([text("Score: 0"), pos(12, 12)]);\` — \`text("Score: 0")\` puts those exact words on the screen, and \`pos(12, 12)\` places them in the top-left corner, the same idea as before. It's named \`scoreLabel\` for the same reason Bean was named \`player\` — so later code can change what it shows.
- Inside \`onCollide\`, two new lines run every time Bean touches a coin: \`score = score + 1;\` takes whatever score is right now and adds one to it. \`scoreLabel.text = "Score: " + score;\` updates the words on screen to show the new score, joining the text "Score: " together with the current number.

Click Run, click inside the preview box, and walk into the gold coin. Watch "Score: 0" change to "Score: 1" in the corner.

Try changing "Score: " to something else, like "Coins: ", and click Run again to see the label update.

If the score text never shows up at all, check that \`pos(12, 12)\` isn't hidden behind something else on screen. If it shows up but never changes, check that \`scoreLabel.text\` is spelled with a lowercase \`.text\`, and that \`scoreLabel\` matches its name exactly everywhere it's used.

Nothing here can break for good — "Reset to working code" brings back a working version, and "Show me the answer" is there any time you want to see the finished code.`;

const step5Code = `kaplay();

loadBean();

const SPEED = 320;

const player = add([
    sprite("bean"),
    pos(120, 80),
    area(),
]);

onKeyDown("left", () => {
    player.move(-SPEED, 0);
});

onKeyDown("right", () => {
    player.move(SPEED, 0);
});

onKeyDown("up", () => {
    player.move(0, -SPEED);
});

onKeyDown("down", () => {
    player.move(0, SPEED);
});

add([
    circle(16),
    color(255, 200, 0),
    pos(360, 200),
    area(),
    "coin",
]);

add([
    circle(16),
    color(255, 200, 0),
    pos(440, 120),
    area(),
    "coin",
]);

add([
    circle(16),
    color(255, 200, 0),
    pos(400, 300),
    area(),
    "coin",
]);

add([
    circle(20),
    color(220, 30, 30),
    pos(220, 260),
    area(),
    "hazard",
]);

const TOTAL_COINS = 3;
let score = 0;
let gameOver = false;

const scoreLabel = add([
    text("Score: 0"),
    pos(12, 12),
]);

player.onCollide("coin", (coin) => {
    if (gameOver) return;
    destroy(coin);
    score = score + 1;
    scoreLabel.text = "Score: " + score;
    if (score === TOTAL_COINS) {
        gameOver = true;
        add([
            text("You win!"),
            pos(200, 140),
        ]);
    }
});

player.onCollide("hazard", () => {
    if (gameOver) return;
    gameOver = true;
    add([
        text("You lose"),
        pos(200, 140),
    ]);
});
`;

const step5Instructions = `This is the last step — it turns your game into something you can actually win or lose.

Here's what's new:

- Two more gold coins, and one red circle. The two extra coins are just copies of the \`add([...])\` block from before with different \`pos(...)\` numbers. The red circle uses the same shape idea, but it's tagged "hazard" instead of "coin," and colored red as a warning: \`color(220, 30, 30)\`.
- \`const TOTAL_COINS = 3;\` — a labeled box holding how many coins exist in total, so the game can check whether Bean has collected all of them.
- \`let gameOver = false;\` — a switch that starts off (\`false\` means "not yet") and gets flipped on once the game ends, so the win or lose message only ever appears once instead of popping up again and again.
- \`if (gameOver) return;\` — the first line inside each collision block. \`if (something)\` means "only do the next part when something is true." Here it means: if the game has already ended, stop right here and skip the rest.
- \`if (score === TOTAL_COINS) { ... }\` — checks whether the score has reached the total number of coins. \`===\` asks "are these two exactly equal?" When it's true, the code inside runs, showing a "You win!" message on screen.
- \`player.onCollide("hazard", () => { ... })\` — the same collision idea as the coin, but for the red circle, and it ends the game with a "You lose" message instead of adding to the score.

Click Run, click inside the preview box, and try both endings: collect all three gold coins with the arrow keys to see "You win!", or walk into the red circle to see "You lose."

If the win or lose message never shows up, check that \`TOTAL_COINS\` matches the number of gold coins actually on screen (3), and that \`"hazard"\` is spelled the same way in the red circle's list and in the \`onCollide("hazard", ...)\` line.

You've gone from a blank screen to a real small game with moving, scoring, winning, and losing. You can still click "Prev" to go back and tinker with any earlier step, or click "Show me the answer" any time you want to see working code.`;

export const steps: Step[] = [
  {
    id: 1,
    title: "Draw a sprite",
    instructions: step1Instructions,
    starterCode: step1Code,
    solutionCode: step1Code,
  },
  {
    id: 2,
    title: "Move it with arrow keys",
    instructions: step2Instructions,
    starterCode: step1Code,
    solutionCode: step2Code,
  },
  {
    id: 3,
    title: "Add something to collide with",
    instructions: step3Instructions,
    starterCode: step2Code,
    solutionCode: step3Code,
  },
  {
    id: 4,
    title: "Add a score",
    instructions: step4Instructions,
    starterCode: step3Code,
    solutionCode: step4Code,
  },
  {
    id: 5,
    title: "Win or lose",
    instructions: step5Instructions,
    starterCode: step4Code,
    solutionCode: step5Code,
  },
];

// Invariant: each step's finished code is exactly the next step's starting
// code, so the learner's own work carries forward continuously across steps
// with no hidden jumps. This throws loudly (breaking the app at load time)
// if that's ever violated, instead of silently shipping a broken chain.
for (let i = 0; i < steps.length - 1; i++) {
  if (steps[i].solutionCode !== steps[i + 1].starterCode) {
    throw new Error(
      `steps.ts invariant broken: step ${steps[i].id}'s solutionCode must be identical to step ${steps[i + 1].id}'s starterCode, so the learner's code carries forward without a hidden jump.`,
    );
  }
}
