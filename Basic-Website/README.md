# Basic Website — Flexbox Froggy + Todo App

## Task Description

This task had two parts. First, complete [Flexbox Froggy](https://flexboxfroggy.com/) to actually get comfortable with flexbox instead of just reading about it. Second, build a todo website using plain HTML, CSS, and JavaScript — no frameworks — with full CRUD (create, read, update, delete) functionality, storing the data in a JavaScript array.

## How I Implemented It

The todo app is three files: `index.html` for structure, `style.css` for styling, and `script.js` for the logic. No build tools, no dependencies — just open `index.html` in a browser.

All the tasks live in a single array in `script.js`:

```js
let tasks = [
  { id: 1, text: "...", completed: false }
];
```

- **Create** — the form at the top pushes a new `{ id, text, completed }` object into the array.
- **Read** — `render()` clears the list and redraws it from the array every time something changes.
- **Update** — clicking the circle toggles `completed`, and double-clicking the task text lets you edit it in place (`contentEditable`).
- **Delete** — clicking the × removes the task from the array, after a short slide-out animation.

I also added a filter (All / Active / Completed) since it felt incomplete without one, and used CSS keyframe animations for adding and removing tasks — new tasks fade/slide in, and completing a task draws a strike-through line across it instead of just snapping the style on.

For the design, I went with a clean, minimal look: warm off-white background, a serif headline font (Fraunces) paired with Inter for body text, and a monospace font just for the task counter.

## What I Learned

- Flexbox Froggy actually made `justify-content` vs `align-items` click in a way that reading docs never did — I kept mixing them up before this.
- Keeping all state in one array and re-rendering the whole list on every change is a lot simpler to reason about than trying to patch the DOM manually for each operation. It's basically a tiny version of how React thinks about state.
- CSS animations on elements that are about to be removed from the DOM need a bit of care — you can't just delete the array item immediately, you have to wait for the animation to finish (`animationend`) or the exit animation never plays.
- Small UI details (hover-to-reveal delete button, disabled empty-state message, focus states) take up a surprising share of the actual build time compared to the CRUD logic itself.

## Screenshots

**Flexbox Froggy — completed:**

![Flexbox Froggy completion](flexbox-froggy-complete.png)
