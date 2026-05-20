# Chapter 1 — Basics

First steps in JavaScript on Node.js. This chapter gets your environment talking, runs your first `console.log`, verifies the runtime (OS, arch, Node version), and shows what happens when V8 sees the same function called thousands of times — i.e. **hot code** and JIT warm-up. Nothing fancy — just enough to confirm "JS works on my machine" before we go deeper.

---

## Files

| File | Topic | What it shows |
|------|-------|---------------|
| `01_Basics.js` | Hello World + variable | First `console.log` and a `let` declaration |
| `02_JS.js` | Variables, loops, functions | Block-scoped `let`, a 100k `for` loop, function hoisting in action |
| `03_JS_Verify_Setup.js` | Environment detection | `process.platform`, `process.arch`, `process.version` |
| `04_HotCode.js` | V8 hot code / JIT | A function called 10,000 times — V8 optimizes it on the fly |

---

## Concepts covered

- ✅ Running JS on Node.js with `node <file>.js`
- ✅ `console.log` — the SDET's best friend
- ✅ `let` variable declaration (block-scoped)
- ✅ `for` loops and loop counters
- ✅ Function declarations and hoisting (calling `print()` before its definition)
- ✅ The `process` global — `platform`, `arch`, `version`
- ✅ V8 hot code path: repeated calls get JIT-optimized
- 🎯 Verifying your dev setup before writing real test code

---

### 01_Basics.js

The classic "does my Node setup work?" check. Prints a greeting and declares a variable that we don't even use — just proving the syntax parses.

```js
console.log("Hello The Testing Academy");
let x = 10;
```

```bash
$ node chapter_01_Basics/01_Basics.js
Hello The Testing Academy
```

---

### 02_JS.js

Demonstrates a few things at once: a top-level `let`, a tight `for` loop running 100,000 iterations, and a `print()` function called from inside the loop. Note: the inner `let a` shadows the outer `a` — different scopes, no collision. Function hoisting means `print()` works even though it's declared below the call site.

```js
let a = 10;
console.log(a);


for (let a = 0; a < 100000; a++) {
    console.log(a);
    print();
}

function print() {
    console.log("Hello");
}
```

```bash
$ node chapter_01_Basics/02_JS.js
10
0
Hello
1
Hello
2
Hello
...
99999
Hello
```

> Heads-up: this prints ~200,001 lines. Pipe it to `head` or redirect to a file if your terminal hates you.

---

### 03_JS_Verify_Setup.js

A quick self-check script. Uses Node's `process` global to print your OS, CPU architecture, and Node version — exactly what you'd capture in a CI log or a bug report.

```js
console.log(process.platform);

// MAC - DARWIN
// WINDOWS - WIN32
// LINUX - LINUX

console.log(process.arch);
// x64
// arm64

console.log("Node Version:", process.version);
```

```bash
$ node chapter_01_Basics/03_JS_Verify_Setup.js
darwin
arm64
Node Version: v20.11.0
```

> Output varies by machine — Mac shows `darwin`, Windows shows `win32`, Linux shows `linux`. Arch is `x64` or `arm64`.

---

### 04_HotCode.js

Introduces the idea of **hot code**. V8 (Node's JS engine) watches functions that get called a lot and JIT-compiles them into optimized machine code. Calling `add()` 10,000 times in a loop is the textbook trigger.

```js
console.log("Hello");

function add(a, b) {
    return a + b;
}
let result;
for (let i = 0; i < 10000; i++) {
    result = add(i, i + 1);
}
console.log("After 10000 calls:", result);
```

```bash
$ node chapter_01_Basics/04_HotCode.js
Hello
After 10000 calls: 19999
```

> Why `19999`? Last iteration is `i = 9999`, so `add(9999, 10000) = 19999`.

---

## How to run

```bash
node chapter_01_Basics/01_Basics.js
node chapter_01_Basics/02_JS.js
node chapter_01_Basics/03_JS_Verify_Setup.js
node chapter_01_Basics/04_HotCode.js
```

No npm install, no config — pure Node.

---

## Takeaway

If all four files run cleanly, your JS + Node environment is good to go. 🎯 Now you know how to print, declare a variable, read the runtime, and you've seen V8 quietly optimize your code — everything else in this repo builds on top.
