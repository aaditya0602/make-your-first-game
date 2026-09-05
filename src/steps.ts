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

const stub = "Coming in Phase 2.";
const stubCode = "// Coming in Phase 2.\n";

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
    instructions: stub,
    starterCode: stubCode,
    solutionCode: stubCode,
  },
  {
    id: 3,
    title: "Add something to collide with",
    instructions: stub,
    starterCode: stubCode,
    solutionCode: stubCode,
  },
  {
    id: 4,
    title: "Add a score",
    instructions: stub,
    starterCode: stubCode,
    solutionCode: stubCode,
  },
  {
    id: 5,
    title: "Win or lose",
    instructions: stub,
    starterCode: stubCode,
    solutionCode: stubCode,
  },
];
