# Chapter 8 — Switch Statement

The `switch` statement is JavaScript's clean alternative to long `if / else if / else` ladders when you're comparing a single expression against many possible discrete values. It evaluates the expression once, jumps straight to the matching `case`, and runs until it hits a `break`. As an SDET you'll see it everywhere — mapping HTTP status codes, dispatching on browser names, routing test events, picking environments. This chapter walks the syntax, the traps (fall-through, missing `break`, the `switch (true)` trick, duplicate cases, strict comparison), and a couple of real-world Playwright-flavored examples.

## Files

| File | Topic | What it shows |
|------|-------|---------------|
| `59_Switch.js` | Basic switch | Day-of-week mapping with `break` and `default` |
| `60_No_Break.js` | Fall-through | What happens when you forget `break` |
| `61_Default.js` | Default branch | When no `case` matches, `default` fires |
| `62_REAL_TIME_EXAMPLE.js` | API status codes | Real SDET use — dispatching on response code |
| `63_Switch_Group.js` | Grouped cases | Multiple `case` labels sharing one body |
| `64_IQ.js` | IQ — fall-through | Interview Q: trace output when `break` is missing |
| `65_IQ2.js` | IQ — `switch (true)` | Range checks with `switch (true)` pattern |
| `66_IQ3.js` | IQ — duplicate cases | What JS does with two identical `case` values |
| `67_IQ4.js` | IQ — strict equality | `switch` uses `===`, so `0 !== false` |

## Concepts covered

- **`switch (expr)`** — evaluates `expr` once, then matches against each `case`.
- **`case` matching** — comparison is **strict (`===`)**, no type coercion.
- **`break`** — exits the switch. Without it, execution **falls through** to the next case.
- **`default`** — runs when no `case` matches. Position doesn't matter, but conventionally last.
- **Grouped cases** — stacking `case` labels with no body in between shares one block of code.
- **`switch (true)`** — idiom for range/boolean checks (each `case` becomes a condition).
- **Duplicate `case` values** — legal syntactically; the **first** match wins, the rest are dead code.
- **Block scoping in cases** — `let` / `const` inside a `case` need braces `{ }` if reused across cases.

---

### 59_Switch.js

Classic day-of-week mapping. Each `case` has its own `break`, so only the matching branch runs. Demonstrates that you can declare variables and run multiple statements inside a `case` body.

```js
let day = 2;
// 1 - mon, 2. - tue

switch (day) {
    case 1:
        console.log('Mon');
        break;
    case 2:
        console.log('Tue');
        let a = 10;
        let b = 30;
        console.log(a + b);
        break;
    case 3:
        console.log('Wed');
        break;
    case 4:
        console.log('Thur');
        break;
    case 5:
        console.log('Fri');
        break;
    case 6:
        console.log('Sat');
        break;
    case 7:
        console.log('Sun');
        break;
    default:
        console.log("No idea which day it is");
}
```

Expected output:

```bash
Tue
40
```

---

### 60_No_Break.js

The fall-through trap. With **no** `break` anywhere, once `case 2` matches it keeps executing every case below it — including `default`.

```js
// Switch
// 0 - Sunday, 1 - Monday, 2 - Tue.....
let day = 2;
switch (day) {
    case 0:
        console.log("Sunday — Rest Day");
    case 1:
        console.log("Monday — Sprint Planning");
    case 2:
        console.log("Tuesday — Development");
    case 3:
        console.log("Wednesday — Code Review");
    case 4:
        console.log("Thursday — Testing");
    case 5:
        console.log("Friday — Deployment & Retro");
    case 6:
        console.log("Saturday — Rest Day");
    default:
        console.log("Invalid day value");
}
```

Expected output:

```bash
Tuesday — Development
Wednesday — Code Review
Thursday — Testing
Friday — Deployment & Retro
Saturday — Rest Day
Invalid day value
```

---

### 61_Default.js

`day = 10` matches no `case`, so `default` runs. This is the same code as 60 but with `break` added — proper behavior restored.

```js
// Switch
// 0 - Sunday, 1 - Monday, 2 - Tue.....
let day = 10;
switch (day) {
    case 0:
        console.log("Sunday — Rest Day");
        break;
    case 1:
        console.log("Monday — Sprint Planning");
        break;
    case 2:
        console.log("Tuesday — Development");
        break;
    case 3:
        console.log("Wednesday — Code Review")
        break;
    case 4:
        console.log("Thursday — Testing");
        break;
    case 5:
        console.log("Friday — Deployment & Retro");
        break;
    case 6:
        console.log("Saturday — Rest Day");
        break;
    default:
        console.log("Invalid day value");
}
```

Expected output:

```bash
Invalid day value
```

---

### 62_REAL_TIME_EXAMPLE.js

Real SDET scenario — branching on an API response code. Exactly the kind of dispatch you'll do inside Playwright API tests.

```js
// You are working API Validation
// response Code - 200, 404, 401, 403.....404


let responseCode = 404;

switch (responseCode) {

    case 200:
        console.log("200 Ok");
        break;
    case 404:
        console.log("404 Not found!");
        break;
    default:
        console.log("Not status code match");

}
```

Expected output:

```bash
404 Not found!
```

---

### 63_Switch_Group.js

Grouped cases — stacked `case` labels with no body share the next block. Perfect for "all Chromium browsers behave the same" style logic.

```js
let browser = "Firefox";

switch (browser) {
    case "Chrome":
    case "Edge":
    case "Brave":
    case "Opera":
        console.log("Chromium Project!");
        break;
    case "Firefox":
        console.log("Mozilla Project!");
        break;
    case "Safari":
        console.log("Apple browser — uses JavaScriptCore engine");
        break;
    default:
        console.log("Unknown browser — manual testing needed");

}
```

Expected output:

```bash
Mozilla Project!
```

---

### 64_IQ.js

Interview Q — no `break` anywhere. Match starts at `"banana"` and falls through every case below it including `default`. Trace it carefully.

```js
let fruit = "banana";
switch (fruit) {
    case "apple":
        console.log("Apple selected");
    case "banana":
        console.log("Banana selected");
    case "cherry":
        console.log("Cherry selected");
    case "date":
        console.log("Date selected");
    default:
        console.log("Default reached");
}
```

Expected output:

```bash
Banana selected
Cherry selected
Date selected
Default reached
```

---

### 65_IQ2.js

The `switch (true)` pattern — each `case` becomes a boolean expression matched against `true`. Cleaner than nested `if/else if` for ranges.

```js
let testScore = 85;
switch (true) {
    case (testScore >= 95):
        console.log("Outstanding — Top performer");
        break;
    case (testScore >= 85):
        console.log("Excellent — Above expectations");
        break;
    case (testScore >= 70):
        console.log("Good — Meets expectations");
        break;
    case (testScore >= 50):
        console.log("Needs Improvement");
        break;
    default:
        console.log("Unsatisfactory — Requires training");
}
```

Expected output:

```bash
Excellent — Above expectations
```

---

### 66_IQ3.js

Interview Q — duplicate `case` values. JS doesn't complain, but only the **first** match runs. The second `case 10:` is dead code.

```js
let x = 10;
switch (x) {
    case 10:
        let b1 = 1;
        console.log(b1);
        break;
    case 10:
        let b2 = 2;
        console.log(b2);
        break;
    default:
        console.log("d");

}

// IT will allow you to have the duplicate case with first as the usage.
```

Expected output:

```bash
1
```

---

### 67_IQ4.js

Strict equality trap. `switch` uses `===`, so `0` does **not** match `case false`. Type matters.

```js
// let value = "5";
// console.log(typeof value);

// switch (value) {
//     case 5:
//         console.log("Number 5 matched");
//         break;
//     case "5":
//         console.log("String '5' matched");
//         break;
// }

let status = 0;
console.log(typeof status)
switch (status) {
    case false:
        console.log("false matched");
        break;
    case 0:
        console.log("0 matched");
        break;
}
```

Expected output:

```bash
number
0 matched
```

> The commented-out top block, if uncommented, would print `string` then **nothing else** — `"5" === 5` is false.

---

## Switch vs If/else ladder

| Aspect | `switch` | `if / else if` |
|--------|---------|----------------|
| **Readability** | Cleaner when matching one expression against many discrete values | Cleaner for complex boolean combinations |
| **Use cases** | Status codes, enums, day names, browser names, event types | Range checks, mixed conditions, `&&`/`||` logic |
| **Comparison** | Strict (`===`) only | Whatever you write (`==`, `===`, `<`, etc.) |
| **Fall-through** | Yes (intentional with grouped cases, accidental without `break`) | No — each branch is isolated |
| **Performance** | Often optimized by JS engines as a jump table for integer keys | Sequential condition evaluation |
| **Default** | Built-in `default` keyword | Final `else` block |

Rule of thumb: **one variable, many discrete values → `switch`. Mixed conditions or ranges → `if/else`** (unless you use the `switch (true)` idiom).

## Common traps

- **Forgetting `break`** — execution falls through to the next case. Almost always a bug (see `60_No_Break.js`, `64_IQ.js`).
- **Expecting type coercion** — `switch` is **strict**. `"5"` never matches `case 5`, `0` never matches `case false` (`67_IQ4.js`).
- **Duplicate `case` values** — legal, but only the first one ever runs (`66_IQ3.js`).
- **`switch (true)` misuse** — works for ranges, but if you write `case testScore > 90` (without `true` as the switch expression) it'll just evaluate to a boolean and compare to your switch value — silently wrong.
- **`let` / `const` scope** — variables declared inside a `case` are scoped to the whole `switch` block. Reusing the same name in a sibling case throws `SyntaxError: Identifier already declared`. Fix by wrapping each `case` body in `{ }`.

## How to run

```bash
node chapter_08_Switch_Statement/59_Switch.js
node chapter_08_Switch_Statement/60_No_Break.js
node chapter_08_Switch_Statement/61_Default.js
node chapter_08_Switch_Statement/62_REAL_TIME_EXAMPLE.js
node chapter_08_Switch_Statement/63_Switch_Group.js
node chapter_08_Switch_Statement/64_IQ.js
node chapter_08_Switch_Statement/65_IQ2.js
node chapter_08_Switch_Statement/66_IQ3.js
node chapter_08_Switch_Statement/67_IQ4.js
```

## Takeaway

`switch` is a clean dispatcher for one-expression-many-values logic, but it's strict (`===`), needs `break` on every branch, and silently allows fall-through and duplicate cases — so know the traps before you ship it into a Playwright suite.
