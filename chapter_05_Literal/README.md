# Chapter 5 — Literals

Literals are the **raw values** you bake straight into your source code — no computation, no function call, just the value itself. This chapter walks SDETs through every literal form JavaScript ships with: primitives (`string`, `number`, `boolean`), the always-confusing `null` vs `undefined` pair, every number base (decimal, binary `0b`, octal `0o`, hex `0x`), exponent form (`1e6`), ES2021 numeric separators (`1_000_000`), `BigInt` (`123n`), special values (`NaN`, `Infinity`), and the three string flavors — single quotes, double quotes, and backticks (template literals) which are gold for Playwright selectors and log lines.

## Files

| File | Topic | What it shows |
|------|-------|---------------|
| `22_Literal.js` | Primitive literals + `typeof` | string, boolean, number, null, undefined and their `typeof` output |
| `23_null_undefined.js` | `null` vs `undefined` deep-dive | who sets what, `==` vs `===`, the `typeof null === "object"` quirk |
| `24_null.js` | Falsy siblings | `null`, undeclared, `0`, `""` — what `typeof` returns |
| `25_Literal_All.js` | Number literal forms | hex `0xFF`, octal `0o77`, exponent `1e6`, `1.5e-4` |
| `26_Literal_Number_all.js` | Every number form, end-to-end | decimal, binary, octal, hex, float, exponent, separator, `BigInt`, `Infinity`, `NaN`, `Number.*` constants |
| `27_String.js` | Single vs double quotes | escaping `"` inside `'…'` and `'` inside `"…"`, `typeof` strings |
| `28_Template_Literal.js` | Template literals in practice | interpolation, dynamic API URLs, Playwright locators, screenshot paths, JSON payloads |
| `29_Backtick_single_double.js` | `'` vs `"` vs `` ` `` | when to use which, interpolation, multiline, expression injection |

## Concepts covered

- **String literals** — `'single'`, `"double"`, `` `backtick` ``
- **Number literals** — `42`, `3.14`, `-0.5`, `.5`, `5.`
- **Boolean literals** — `true`, `false`
- **`null`** — explicitly empty (developer-set). `typeof null === "object"` — historical JS bug, still here
- **`undefined`** — declared but never assigned (JS-set automatically)
- **`null == undefined`** is `true`, but `null === undefined` is `false`
- **Number bases** — decimal `42`, binary `0b1010`, octal `0o52`, hex `0x2A` (all equal `42`)
- **Exponent notation** — `1e6`, `1.5e-3`, `2E10`
- **Numeric separators (ES2021+)** — `1_000_000`, `0b1010_0001`, `0xFF_FF`
- **BigInt** — `123n` literal or `BigInt("123")`; `typeof === "bigint"`; cannot mix with `Number`
- **Special values** — `Infinity`, `-Infinity`, `NaN` (and the quirky `typeof NaN === "number"`)
- **`Number.*` constants** — `MAX_VALUE`, `MIN_VALUE`, `MAX_SAFE_INTEGER`, `EPSILON`
- **Template literals** — `${var}` interpolation, `${a + b}` expressions, multiline strings, Playwright selector composition

---

### 22_Literal.js

Five primitive literals stitched together with `typeof` — the SDET's first peek at what JS calls each value.

```js
let age = "pramod"; // This is a string literal assigned to the variable 'age'.
let isStudent = true; // This is a boolean literal assigned to the variable 'isStudent'.
let pi = 3.14; // This is a numeric literal assigned to the variable 'pi'.
let name = 'Alice'; // This is a string literal assigned to the variable 'name'.
let nullValue = null; // This is a null literal assigned to the variable 'nullValue'.
let undefinedValue; // This variable is declared but not assigned, so it has the value 'undefined'.

// typeof - operatr - It will tell you what is a data type that it has. 
console.log(typeof age);
console.log(typeof pi);
console.log(typeof isStudent);
console.log(typeof nullValue);
console.log(typeof undefinedValue);
```

```bash
string
number
boolean
object
undefined
```

Note: `typeof null` is `"object"` — JS quirk, not a bug you can fix.

---

### 23_null_undefined.js

The classic interview question, explained. `undefined` = JS hasn't given it a value. `null` = you said "no value on purpose."

```js
let userName; // declared but not assigned
console.log(userName);        // undefined
console.log(typeof userName); // "undefined"

let profilePicture = null;
console.log(profilePicture);        // null
console.log(typeof profilePicture); // "object"  <-- known JS quirk!

let a;
let b = null;
console.log(a == b);   // true
console.log(a === b);  // false
```

```bash
undefined
undefined
undefined
null
object
true
false
undefined
object
Value is undefined (not assigned yet)
Value is null (explicitly empty)
Value is: hello
```

---

### 24_null.js

Quick sanity check — empty string and zero are still typed as `string` and `number`. They're falsy, not "empty."

```js
let no_audi_pramod_sir_has = null;
let pramod_has_two_wives;

let age = 0;

let audi = "";
console.log(typeof audi);
console.log(typeof age);
```

```bash
string
number
```

---

### 25_Literal_All.js

Number bases and exponent notation in one screen. Hex `0xFF` = 255, octal `0o77` = 63, `1e6` = 1,000,000.

```js
let count = 42;
let negative = -100;
let zero = 0;

let h = 0xFF;
console.log(typeof h);
let color_hex = 0xFF0000;

let octal = 0o77; //base

let million = 1e6;
let tiny = 1.5e-4;
```

```bash
number
```

---

### 26_Literal_Number_all.js

The grand tour: every number form, every special value, every `Number.*` constant. Bookmark this file.

```js
let decimal = 42;
let binary = 0b1010;   // 10
let octal = 0o52;      // 42
let hex = 0x2A;        // 42

let exp1 = 1.5e3;      // 1500
let million = 1_000_000;
let big = 123456789012345678901234567890n;

console.log("typeof BigInt:", typeof big); // "bigint"
console.log("Infinity:", Infinity);
console.log("typeof NaN:", typeof NaN);    // "number"
console.log("MAX_SAFE_INTEGER:", Number.MAX_SAFE_INTEGER);
```

```bash
Decimal: 42
Binary 0b1010: 10
Octal 0o52: 42
Hexadecimal 0x2A: 42
Float 3.14: 3.14
Float -0.5: -0.5
Float .5: 0.5
Float 5.: 5
Exponential 1.5e3: 1500
Exponential 1.5e-3: 0.0015
Exponential 2E10: 20000000000
Separator 1_000_000: 1000000
Separator 0b1010_0001: 161
Separator 0xFF_FF: 65535
BigInt literal: 123456789012345678901234567890n
BigInt from string: 123456789012345678901234567890n
BigInt from number: 42n
typeof BigInt: bigint
BigInt + 1n: 123456789012345678901234567891n
Infinity: Infinity
1 / 0: Infinity
-1 / 0: -Infinity
typeof Infinity: number
-Infinity: -Infinity
NaN: NaN
0 / 0: NaN
'hello' * 2: NaN
typeof NaN: number

--- Number Properties ---
MAX_VALUE: 1.7976931348623157e+308
MIN_VALUE: 5e-324
MAX_SAFE_INTEGER: 9007199254740991
MIN_SAFE_INTEGER: -9007199254740991
POSITIVE_INFINITY: Infinity
NEGATIVE_INFINITY: -Infinity
NaN property: NaN
EPSILON: 2.220446049250313e-16
```

---

### 27_String.js

Single and double quotes behave identically — pick one and escape the other when you need it inline.

```js
// Single quotes
let single = 'Hello World';
let withDouble = 'She said "hi"';

// Double quotes
let double = "Hello World";
let withSingle = "It's a test";


let c = 'c';
let c1 = 'cc';
console.log(typeof c);
console.log(typeof c1);
console.log(typeof double);
```

```bash
string
string
string
```

JS has no `char` type — a single character is still a `string`.

---

### 28_Template_Literal.js

Backticks (`` ` ``) are the SDET's best friend — interpolation for env-aware API URLs, Playwright locators, screenshot paths, and log lines.

```js
let firstname = "Prrammod";
let fullname = `Hi ${firstname} Dutta`;
console.log(fullname);

let env = "prod";
const userId = 12345;
const apiUrl = `https://api-${env}.tekion.com/users/${userId}`;
console.log(apiUrl);

// Playwright
const rowIndex = 3;
const columnName = "email";
await page.locator(`[data-row="${rowIndex}"] [data-col="${columnName}"]`).click();

// Logs
const testName = "Login Test";
const status = "FAILED";
const duration = 2.3;
console.log(`[${status}] ${testName} completed in ${duration}s`);

// Screenshot path
const testCase = "checkout_flow";
const timestamp = Date.now();
await page.screenshot({ path: `screenshots/${testCase}_${timestamp}.png` });
```

```bash
Hi Prrammod Dutta
https://api-prod.tekion.com/users/12345
[FAILED] Login Test completed in 2.3s
```

Note: the `await page.locator(...)` and `page.screenshot(...)` lines need a Playwright `page` fixture — they'll throw if you `node` the file directly. The string composition is what matters here.

---

### 29_Backtick_single_double.js

Side-by-side: `'…'` and `"…"` are dumb strings, `` `…` `` is a smart string. Interpolation, expressions, and multiline all live in the backtick.

```js
let single = 'Hello World';
let double = "Hello World";

let name = "Harish";
let age = 25;

let greeting = `Hello, my name is ${name} and I am ${age} years old.`;

let multiLine = `
  Line 1
  Line 2
  Line 3
`;

let sum = `10 + 20 = ${10 + 20}`;

let product = "Laptop";
let price = 50000;
let oldWay = "The " + product + " costs " + price + " rupees.";
let newWay = `The ${product} costs ${price} rupees.`;
```

```bash
Single Quote: Hello World
Double Quote: Hello World
Backtick with variable: Hello, my name is Harish and I am 25 years old.
Backtick multi-line: 
  Line 1
  Line 2
  Line 3

Backtick expression: 10 + 20 = 30
Old way: The Laptop costs 50000 rupees.
New way: The Laptop costs 50000 rupees.
```

---

## `'…'` vs `"…"` vs `` `…` ``

| Feature | `'single'` | `"double"` | `` `backtick` `` |
|---|:---:|:---:|:---:|
| Simple text | yes | yes | yes |
| Variable interpolation `${var}` | no | no | **yes** |
| Expressions `${a + b}` | no | no | **yes** |
| Multi-line without `\n` | no | no | **yes** |
| Escape needed for `"` | no | yes (`\"`) | no |
| Escape needed for `'` | yes (`\'`) | no | no |
| Playwright selector composition | clunky | clunky | **idiomatic** |

## How to run

```bash
# Run a single file directly
node chapter_05_Literal/22_Literal.js
node chapter_05_Literal/26_Literal_Number_all.js

# 28_Template_Literal.js uses Playwright APIs — run only the
# console.log lines, or wrap in a Playwright test before executing.
```

## Takeaway

Literals are tiny but trip everyone up — remember `typeof null === "object"`, `null == undefined` is `true` (but `===` is `false`), and `NaN` is a `number`. For real-world Playwright work, backticks win every time: cleaner selectors, dynamic URLs, structured logs.
