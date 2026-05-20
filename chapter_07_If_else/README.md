# Chapter 7 — If / Else

Control flow is where code starts making decisions. This chapter walks SDETs through JavaScript conditionals — `if`, `if/else`, the `else if` ladder, nested branches, truthy/falsy gotchas, and logical operators glued into conditions. We close with real-world drills you'll meet on the job: login flows, role-based access, API status branching, even/odd, grade calculators, and the classic leap-year check.

## Files

| File | Topic | What it shows |
|------|-------|---------------|
| `48_IF_ESLE.js` | Basic if/else | Voting age check |
| `49_If_elseif_else.js` | else-if ladder | Score → grade A/B/C/D/F |
| `50_REAL_IF_ELSE.js` | Nested if/else | Role-based access (admin/editor/viewer) |
| `51_API_IF_ELSE.js` | API status branching | 200 / 404 / default |
| `52_IQ_IF_ELSE.js` | Truthy vs falsy | What counts as `true` inside `if(...)` |
| `53_IF_ELSE_real.js` | Logical ops + if | Login with `&&` across multiple flags |
| `54_IQ.js` | One-liner if | `if` without braces |
| `55_IE.js` | Solo `if` | Standalone `if` is legal — no `else` required |
| `56_IQ_EVEN_ODD.js` | Modulo + if/else | Even / Odd check |
| `57_Grade_Calc.js` | Grade calculator | Marks → grade ladder |
| `58_LEAP_YEAR.js` | Leap year logic | `% 4`, `% 100`, `% 400` combo |

## Concepts covered

- `if` — single-branch decision
- `if / else` — two-way fork
- `if / else if / else` ladder — multi-way decision (grade, status code, role)
- Nested `if` — decisions inside decisions (login → role)
- Truthy vs falsy — what `if (value)` actually evaluates
- Logical operators (`&&`, `||`) inside conditions
- One-liner `if` without braces (allowed, but discouraged in production)
- Real-world flavors: login, role-based access, API status branching, even/odd, grade calc, leap year

---

### 48_IF_ESLE.js — basic if/else

Two-way fork using a single condition. Classic "can this user vote?" check.

```js
let age = 20;

if (age > 18) {
    console.log("You are allowed to vote!")
} else {
    console.log("You are not allowed  to vote!")
}
```

```bash
You are allowed to vote!
```

---

### 49_If_elseif_else.js — else-if ladder

Multi-way branching. First matching condition wins — order matters.

```js
let score = 78;

if (score >= 90) {
    console.log("A");
} else if (score >= 80) {
    console.log("B");
} else if (score >= 70) {
    console.log("C");
} else if (score >= 60) {
    console.log("D");
} else {
    console.log("F- Fail");
    console.log("Rewartch all videoa nd give the test again");
}
```

```bash
C
```

---

### 50_REAL_IF_ELSE.js — nested if for role-based access

Outer gate checks login, inner ladder routes by role. Same shape as RBAC on `app.vwo.com`.

```js
// let age = 18;

// if (age >= 18) {
//     console.log("You are an adult.");
// } else {
//     console.log("You are a minor.");
// }

// app.vwo.com -> viewer, editor or admin -> 


let isLoggedIn = true;
let userRole = "XYZ";

if (isLoggedIn) {

    if (userRole === "admin") {
        console.log("admin can do all the things");
    }
    else if (userRole === "editor") {
        console.log("Welcome Editor — Edit access granted.");
    } else if (userRole === "viewer") {
        console.log("Welcome Viewer — Read-only access.");
    } else {
        console.log("No idea you may be a guest! role");
    }


} else {
    console.log("You are not logged in!!");
}
```

```bash
No idea you may be a guest! role
```

---

### 51_API_IF_ELSE.js — branching on API status code

Bread-and-butter for SDETs — branch on response codes.

```js

let statusCode = 200;

if (statusCode === 200) {
    console.log("API are working fine!")
} else if (statusCode === 404) {
    console.log("API not found!")
} else {
    console.log("Not status code match!")
}
```

```bash
API are working fine!
```

---

### 52_IQ_IF_ELSE.js — truthy vs falsy

`0` is falsy, so the `else` branch fires. Comments list the rest of the falsy crew.

```js
// if ("hello") console.log("String is truthy"); // // "hello" = truthy
// if (42) console.log("Number is truthy");
// if ({}) console.log("Empty object is truthy!");
// if ([]) console.log("Empty array is truthy!");

// if ("") console.log("Won't print");
// if (null) console.log("Won't print");
// if (undefined) console.log("Won't print");
// if (NaN) console.log("Won't print");
// if (0) console.log("Won't print");

// ANY NUMBER = 1,2,,3,34,32,2,- TRUTH
// 0= FALSE

let name = 0;
if (name) {
    console.log("Hi");
} else {
    console.log("Bye");
}
```

```bash
Bye
```

---

### 53_IF_ELSE_real.js — logical operators inside if

Combine `&&` to require multiple conditions at once. Watch the `isAccountLocked` flag — it's `true`, so the gate still opens here (semantic bug worth a chuckle).

```js
let username = "Dev";
let password = "secure123";
let isAccountLocked = true;

// Logical operator + if-else statement

if ((username === "Dev" && password === "secure123") && isAccountLocked) {
    console.log("Allowed to enter");
} else {
    console.log("not allwed to enter");
}
```

```bash
Allowed to enter
```

---

### 54_IQ.js — one-liner if without braces

If the body is a single statement, braces are optional. Readable for one-liners, dangerous when someone adds a second line later.

```js
let x = 10;
if (x > 5)
    console.log("x is big");
```

```bash
x is big
```

---

### 55_IE.js — solo `if` is fine

You don't need `else`. An `if` block by itself is valid syntax.

```js
// Single if is allowed. 
if (true) {

}

```

```bash

```

---

### 56_IQ_EVEN_ODD.js — even/odd with modulo

The interview classic. `% 2 === 0` → even, otherwise odd.

```js
let num = 7;

if (num % 2 === 0) {
    console.log(num + " is Even");
} else {
    console.log(num + " is Odd");
}
```

```bash
7 is Odd
```

---

### 57_Grade_Calc.js — grade calculator

Same ladder pattern as file 49, applied to a marks field.

```js
let marks = 85;

if (marks >= 90) {
    console.log("Grade: A");
} else if (marks >= 80) {
    console.log("Grade: B");
} else if (marks >= 70) {
    console.log("Grade: C");
} else if (marks >= 60) {
    console.log("Grade: D");
} else {
    console.log("Grade: Fail");
}
```

```bash
Grade: B
```

---

### 58_LEAP_YEAR.js — leap year check

Combines `&&` and `||` into a single condition. Divisible by 4 AND not by 100, OR divisible by 400.

```js
// Leap Year Check

Rules:

// Divisible by 4 AND not divisible by 100 → Leap year
// OR divisible by 400 → Leap year
// Else → Not a leap year

let year = 2024;

if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    console.log(year + " is a Leap Year");
} else {
    console.log(year + " is NOT a Leap Year");
}
```

```bash
2024 is a Leap Year
```

> Note: the file as written has bare `Rules:` text outside a comment — Node will throw a `SyntaxError` if you run it as-is. Either comment the line out (`// Rules:`) or delete it before running.

---

## Truthy vs Falsy

Inside `if (value)`, JavaScript coerces `value` to a boolean. Memorize the falsy list — everything else is truthy.

| Category | Examples | Evaluates to |
|----------|----------|--------------|
| Falsy | `false`, `0`, `-0`, `""`, `null`, `undefined`, `NaN` | `false` |
| Truthy | `"hello"`, `"0"` (non-empty string!), `42`, `-1`, `{}`, `[]`, `function(){}` | `true` |

Gotchas SDETs trip on:
- `"0"` (string) is **truthy** — only the number `0` is falsy.
- `[]` and `{}` are **truthy** — empty collections still count as objects.
- `NaN` is falsy, but `NaN === NaN` is `false`. Use `Number.isNaN()` to test.

## How to run

```bash
node chapter_07_If_else/48_IF_ESLE.js
node chapter_07_If_else/49_If_elseif_else.js
node chapter_07_If_else/50_REAL_IF_ELSE.js
node chapter_07_If_else/51_API_IF_ELSE.js
node chapter_07_If_else/52_IQ_IF_ELSE.js
node chapter_07_If_else/53_IF_ELSE_real.js
node chapter_07_If_else/54_IQ.js
node chapter_07_If_else/55_IE.js
node chapter_07_If_else/56_IQ_EVEN_ODD.js
node chapter_07_If_else/57_Grade_Calc.js
node chapter_07_If_else/58_LEAP_YEAR.js
```

## Takeaway

`if / else if / else` is how your scripts make decisions — assertion outcomes, status-code branches, role gates, retry logic. Master truthy/falsy and the operator precedence inside conditions, and you'll write fewer flaky tests.
