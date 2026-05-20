# Chapter 9 — User Input

Three ways to read user input in JavaScript: the **browser-only** `prompt()`, Node's **built-in** `readline` module (async callback API), and the **npm package** `prompt-sync` (clean synchronous API). All three examples solve the same toy problem — read a number, print whether it's Even or Odd — so you can compare the ergonomics side-by-side. As SDETs, you'll mostly use the Node options; `prompt()` is here so you know why it explodes the moment you run it outside a browser.

## Files

| File | Approach | Runtime | Sync/Async | Needs install |
|---|---|---|---|---|
| `68_User_Input.js` | `prompt()` | Browser only | Sync | No |
| `69_Node_readline.js` | `readline` (built-in) | Node | Async (callback) | No |
| `70_prompt_sync.js` | `prompt-sync` (npm) | Node | Sync | Yes — `npm i prompt-sync` |

## Concepts covered

- **`prompt()`** — global in the browser, opens a modal dialog. Does **not** exist in Node — running it there throws `ReferenceError: prompt is not defined`.
- **`readline`** — Node's built-in module. Async callback style: you create an interface bound to `process.stdin` / `process.stdout`, then call `rl.question(...)` and receive the input in a callback.
- **`prompt-sync`** — third-party npm package. Gives you a synchronous, `prompt()`-flavored API in Node. Nice for quick scripts and demos, but requires installing a dependency.
- **String → Number conversion** — every approach returns a **string**. Always wrap numeric input in `Number(...)` before doing math.

---

### 68_User_Input.js

Uses the browser global `prompt()` to read input synchronously, converts it to a number, and prints Even/Odd. Run this in a browser console or as a `<script>` — **not** in Node.

```js
let num = prompt("Enter a number:");
num = Number(num);  // convert string to number

if (num % 2 === 0) {
    console.log(num + " is Even");
} else {
    console.log(num + " is Odd");
}
```

Expected output (browser console, user types `7`):

```bash
7 is Odd
```

If you run this in Node:

```bash
$ node 68_User_Input.js
ReferenceError: prompt is not defined
```

---

### 69_Node_readline.js

Node's built-in `readline` module — async callback API. The whole file ships **commented out** in the repo; below is the uncommented working version (with the `r1.close()` typo from the file fixed to `rl.close()`).

```js
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter a number: ", (input) => {
    let num = Number(input);

    if (num % 2 === 0) {
        console.log(num + " is Even");
    } else {
        console.log(num + " is Odd");
    }

    rl.close();
});
```

Expected output:

```bash
$ node 69_Node_readline.js
Enter a number: 4
4 is Even
```

---

### 70_prompt_sync.js

`prompt-sync` gives you a clean, blocking, browser-`prompt()`-style API in Node. The file ships **commented out**; install the package first, then uncomment.

```js
const prompt = require("prompt-sync")();

let num = Number(prompt("Enter a number: "));

if (num % 2 === 0) {
    console.log(num + " is Even");
} else {
    console.log(num + " is Odd");
}
```

Expected output:

```bash
$ npm install prompt-sync
$ node 70_prompt_sync.js
Enter a number: 9
9 is Odd
```

---

## Comparison table

| Feature | `prompt()` | `readline` | `prompt-sync` |
|---|---|---|---|
| Where it runs | Browser only | Node | Node |
| Style | Sync (modal dialog) | Async (callback) | Sync (blocking) |
| Needs install | No | No (built-in) | Yes (`npm i prompt-sync`) |
| Returns | String | String (in callback) | String |
| Best for | Browser demos | Real Node scripts / CLI tools | Quick demos & teaching |

## How to run

```bash
# 68 — will FAIL in Node with ReferenceError: prompt is not defined
node chapter_09_UserInput/68_User_Input.js

# 69 — works after uncommenting the file (built-in module, no install)
node chapter_09_UserInput/69_Node_readline.js

# 70 — install first, then uncomment the file
npm install prompt-sync
node chapter_09_UserInput/70_prompt_sync.js
```

Tip for `68_User_Input.js`: paste the code into your browser's DevTools Console, or wrap it in an HTML `<script>` tag and open the file in a browser.

## Takeaway

All three APIs hand you back a **string** — `Number(input)` is non-negotiable for any math, comparison, or modulo check. Pick `readline` for real Node CLIs, `prompt-sync` for quick teaching demos, and remember that `prompt()` only lives in the browser. 🧪
