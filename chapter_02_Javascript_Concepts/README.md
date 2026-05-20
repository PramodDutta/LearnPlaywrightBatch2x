# Chapter 2 — JavaScript Concepts

First real touch of JavaScript syntax for the batch. We open the engine hood with a one-liner: declare a variable with `var`, print it, then reassign it. The point isn't the value — it's seeing that JS variables are mutable bindings and that `console.log` is your first debugging tool as an SDET. 🎯

## Files

| File | Topic | What it shows |
| --- | --- | --- |
| `05_JS_Basics.js` | Variable declaration & reassignment | Declaring with `var`, printing with `console.log`, then mutating the value |

## Concepts covered

- `var` keyword for variable declaration (the legacy, function-scoped one)
- Reassignment — JS variables are mutable by default
- `console.log()` as the simplest output / debugging mechanism
- Statements terminated with `;` (optional, but used here)
- Running a `.js` file with Node.js (no browser required)

---

### 05_JS_Basics.js

Declares a `var` named `v`, logs it, then reassigns it. The second assignment has no `console.log` after it, so only the first value is printed — a subtle reminder that assignment alone produces no output. ✅

```js
var v = 10;
console.log(v);

v = 12;
```

Expected output:

```bash
10
```

---

## How to run

```bash
node chapter_02_Javascript_Concepts/05_JS_Basics.js
```

You'll need Node.js installed (`node -v` should print a version). No `npm install` needed for this chapter — it's pure JavaScript.

## Takeaway

`var` declares, `=` assigns, `console.log` prints. This is the smallest possible JS program that still teaches a real concept — and every Playwright test you'll write later is built on exactly these primitives.
