# Chapter 6 — Operators

Operators are the verbs of JavaScript — they assign, calculate, compare, combine, and convert. For SDETs, mastering operators is the difference between a test that quietly passes a false-positive (`==` vs `===`!) and one that actually validates the API contract. This chapter walks through every operator family with hands-on snippets, interview gotchas, and Playwright-flavored examples (status codes, SLAs, CI flags).

## Files

| File | Topic | What it shows |
|------|-------|---------------|
| `30_Operator.js` | Assignment `=` | Re-assigning the same variable; right-to-left assignment |
| `31_Arithmetic_OP.js` | Arithmetic `+ - * /` | Basic math with two numbers |
| `32_Modulus_OP.js` | Modulus `%` | Remainder + even/odd detection |
| `33_Expo_OP.js` | Exponentiation `**` | `2 ** 3`, variable exponents |
| `34_IQ.js` | Compound assignment | `+= -= *= /= %=` chained on one variable |
| `35_Comparsion_OP.js` | Comparison basics | `> < >= <=` returning boolean |
| `36_Comparsion_Strict_loose.js` | `==` vs `===`, `!=` vs `!==` | Type coercion vs strict checks |
| `37_IQ_Loose_Strict.js` | Loose-equality quiz | `null == undefined`, transitivity break |
| `38_Confusing_Comparsion.js` | The gotcha tour | NaN, `[] == ![]`, hex strings, null traps |
| `39_Logical_Op.js` | `&& \|\| !` | AND, OR, NOT on booleans |
| `40_String_Con_Op.js` | String concat with `+=` | Building a string incrementally |
| `41_Ternary_Op.js` | Ternary `? :` | Single, nested, and SDET use-cases (status code, env, SLA) |
| `42_Type_Op.js` | `typeof` | Strings, numbers, arrays — the `typeof []` trap |
| `43_Incre_Decre_Op.js` | Post-decrement `a--` | Old value returned, then decremented |
| `44_Null_Op.js` | Nullish coalescing `??` | Fallback only on `null`/`undefined` |
| `45_Post_Increment.js` | Post-increment `a++` | Assign first, then increment |
| `46_IQ_INCREMENT_D.js` | Increment quiz | `let result = a++` |
| `47_Advance_ID_.js` | Advanced increment IQ | `++a + ++a` evaluation order |

## Concepts covered

- **Assignment** — `=` and compound forms `+= -= *= /= %=`
- **Arithmetic** — `+ - * / % **`
- **Comparison** — `> < >= <=` and equality `==` vs `===`, `!=` vs `!==`
- **Logical** — `&&`, `||`, `!`
- **String concatenation** — `+` and `+=` on strings
- **Ternary** — `cond ? a : b`, including nested ternaries for status-code routing
- **`typeof`** — and its `null → "object"` legacy bug
- **Increment / Decrement** — pre (`++a`) vs post (`a++`)
- **Nullish coalescing** — `??` (fallback only when left side is `null`/`undefined`)

---

### 30_Operator.js
Assignment `=` writes the right-hand value into the left-hand variable. Re-assigning just overwrites the slot.

```js
let x = 10;
x = 11;
x = 90;
console.log(x);
```

```bash
90
```

### 31_Arithmetic_OP.js
The classic four `+ - * /`. Division returns a float in JS — no integer division.

```js
let a = 10, b = 3;
console.log(a);
console.log(b);

let sum = a + b;
let sub = a - b;
let mul = a * b;
let div = a / b;

console.log(sum);
console.log(sub);
console.log(mul);
console.log(div);
```

```bash
10
3
13
7
30
3.3333333333333335
```

### 32_Modulus_OP.js
`%` returns the remainder. Bread-and-butter for even/odd checks: `n % 2 === 0` is even.

```js
let result = 13 % 7;
console.log(result);

console.log(101 % 2);
console.log(100 % 2);
console.log(37 % 2);
console.log(36 % 2);
```

```bash
6
1
0
1
0
```

### 33_Expo_OP.js
`**` is exponentiation. `2 ** 3` is `2³`. Works with variables too.

```js
console.log(2 ** 3);

let x = 10;
let y = 3;
console.log(x ** y);
```

```bash
8
1000
```

### 34_IQ.js
Compound assignment operators mutate the variable in place: `x += 10` is `x = x + 10`.

```js
let x = 10;
x += 10;
console.log(x);

x -= 3;
console.log(x);

x *= 2;
console.log(x);

x /= 17;
console.log(x);

x %= 2;
console.log(x);
```

```bash
20
17
34
2
0
```

### 35_Comparsion_OP.js
Comparison operators always return a boolean. `>=` is "greater than OR equal" — an OR gate of two checks.

```js
console.log(3 > 4);
console.log(3 < 4);
console.log(4 >= 4);
console.log(3 <= 4);
```

```bash
false
true
true
true
```

### 36_Comparsion_Strict_loose.js
`==` coerces types (loose), `===` checks both type and value (strict). `!=` and `!==` mirror that. `!===` doesn't exist.

```js
console.log(true == 1);
console.log(false == 0);
console.log(true == "1");
console.log(true == 2);

console.log(5 != "5");
console.log(5 !== "5");
```

```bash
true
true
true
false
false
true
```

### 37_IQ_Loose_Strict.js
The famous transitivity break: `0 == ""` and `0 == "0"` are both true, but `"" == "0"` is false. `null == undefined` is true, but `null === undefined` is false.

```js
console.log(0 == "");
console.log(0 == "0");
console.log("" == "0");

console.log(0 == false);
console.log(null == 0);
console.log(null == undefined);
console.log(null === undefined);
```

```bash
true
true
false
true
false
true
false
```

### 38_Confusing_Comparsion.js
The full gotcha tour — NaN, arrays, hex strings, the infamous `[] == ![]`. Read this once, then always use `===`.

```js
console.log("38 — Confusing Comparisons in JS");

console.log("" == 0);
console.log("0" == 0);
console.log("" == "0");

console.log(null == undefined);
console.log(null === undefined);
console.log(null == 0);
console.log(null >= 0);
console.log(null > 0);

console.log(NaN == NaN);
console.log(NaN === NaN);
console.log(Number.isNaN(NaN));

console.log([] == false);
console.log([1, 2] == "1,2");
console.log({} == {});
console.log([] == []);

console.log("0x10" == 16);
console.log("1e2" == 100);

console.log(typeof null);
console.log(typeof NaN);

console.log([] == ![]);
```

```bash
38 — Confusing Comparisons in JS
true
true
false
true
false
false
true
false
false
false
true
true
true
false
false
true
true
object
number
true
```

### 39_Logical_Op.js
`&&` (AND), `||` (OR), `!` (NOT). Boolean inputs, boolean outputs.

```js
let a = true;
let b = false;
console.log(a && b);
console.log(a || b);
console.log(!a);

console.log(5 != "g");
```

```bash
false
true
false
true
```

### 40_String_Con_Op.js
`+` on strings concatenates. `+=` builds a string incrementally — handy for assembling URLs or log lines.

```js
let s = "Hi";
s += " Dev";
console.log(s);
```

```bash
Hi Dev
```

### 41_Ternary_Op.js
`condition ? ifTrue : ifFalse`. SDET-flavored examples: pass/fail markers, env-based URLs, CI-aware browser modes, SLA checks, and HTTP status categorisation via nested ternary.

```js
let rajkumar_age = 18;
let rj_will_goa = rajkumar_age >= 18 ? "RJ will go goa" : "No Goa";
console.log(rj_will_goa)

let actualStatusCode = 200;
let expectedStatusCode = 200;
let testResult = actualStatusCode === expectedStatusCode ? "✅ PASS" : "❌ FAIL";
console.log(testResult);

let environment = "staging";
let baseUrl = environment === "prod"
    ? "https://api.example.com"
    : "https://staging-api.example.com";
console.log(baseUrl);

let isCI = true;
let browserMode = isCI ? "headless" : "headed";
console.log("Launching browser in:", browserMode, "mode");

let responseTime = 850;
let sla = 1000;
let slaStatus = responseTime <= sla ? "Within SLA ✅" : "SLA breached ❌";
console.log(`Response: ${responseTime}ms — ${slaStatus}`);

let statusCode = 404;
let category =
    statusCode < 300 ? "Success" :
        statusCode < 400 ? "Redirect" :
            statusCode < 500 ? "Client Error" : "Server Error";
console.log(`Status ${statusCode}: ${category}`);
```

```bash
RJ will go goa
✅ PASS
https://staging-api.example.com
Launching browser in: headless mode
Response: 850ms — Within SLA ✅
Status 404: Client Error
```

### 42_Type_Op.js
`typeof` returns a string describing the type. Two famous traps: `typeof null === "object"` (legacy bug), and `typeof []` is also `"object"` — use `Array.isArray()` to check arrays.

```js
console.log(typeof "hello");
console.log(typeof 123);
console.log(typeof 31.4);
console.log(typeof []);
```

```bash
string
number
number
object
```

### 43_Incre_Decre_Op.js
Post-decrement `a--` returns the **old** value first, then subtracts 1.

```js
let a = 10;
let b = a--;
console.log(b);
console.log(a);
```

```bash
10
9
```

### 44_Null_Op.js
`??` (nullish coalescing) returns the right side only when the left is `null` or `undefined`. Unlike `||`, it does NOT trigger on `0`, `""`, or `false`.

```js
console.log(null >= 0);
console.log(null === 0);

let amul = null;
let milk_required = amul ?? "nandani milk";
console.log(milk_required);
```

```bash
true
false
nandani milk
```

### 45_Post_Increment.js
`a++` assigns the current value first, **then** increments. `b` keeps the old `10`; `a_post` becomes `11`.

```js
let a_post = 10;
let b = a_post++;
console.log(a_post);
console.log(b);
```

```bash
11
10
```

### 46_IQ_INCREMENT_D.js
Quick interview check on post-increment.

```js
let a = 34;
let result = a++;
console.log(result);
console.log(a);
```

```bash
34
35
```

### 47_Advance_ID_.js
`++a + ++a` — both pre-increment, evaluated left to right. First `++a` → `11`, second `++a` → `12`. Sum is `23`, and `a` ends at `12`.

```js
let a = 10;
console.log(++a + ++a);
console.log(a);
```

```bash
23
12
```

---

## `==` vs `===` — the cheatsheet

| Aspect | `==` (loose) | `===` (strict) |
|--------|-------------|----------------|
| Type coercion | Yes — converts operands | No — types must match |
| `42 == "42"` | `true` | `false` |
| `0 == ""` | `true` | `false` |
| `null == undefined` | `true` | `false` |
| `NaN == NaN` | `false` | `false` |
| Use when... | Checking `x == null` (catches both `null` and `undefined`) | **Default choice — always prefer this** |

Rule of thumb: write `===` everywhere. Reach for `==` only for the `x == null` idiom.

## `||` vs `??` — when they differ

`||` falls back on any **falsy** value. `??` falls back only on `null` / `undefined`. That matters for legitimate values like `0` and `""`.

| Left value     | `left \|\| "fallback"` | `left ?? "fallback"` |
|----------------|------------------------|----------------------|
| `0`            | `"fallback"`           | `0`                  |
| `""`           | `"fallback"`           | `""`                 |
| `false`        | `"fallback"`           | `false`              |
| `null`         | `"fallback"`           | `"fallback"`         |
| `undefined`    | `"fallback"`           | `"fallback"`         |
| `NaN`          | `"fallback"`           | `NaN`                |

Use `??` when `0`, `""`, or `false` are valid values (timeouts, counts, empty strings).

## Pre vs Post increment

| Expression | Returns | Then variable becomes |
|------------|---------|-----------------------|
| `++a` (pre)  | the **new** value (`a + 1`) | `a + 1` |
| `a++` (post) | the **old** value (`a`)     | `a + 1` |
| `--a` (pre)  | the **new** value (`a - 1`) | `a - 1` |
| `a--` (post) | the **old** value (`a`)     | `a - 1` |

Example: if `a = 10`, then `let b = ++a` gives `b = 11, a = 11`. But `let b = a++` gives `b = 10, a = 11`.

## How to run

```bash
node chapter_06_Operator/30_Operator.js
node chapter_06_Operator/34_IQ.js
node chapter_06_Operator/38_Confusing_Comparsion.js
node chapter_06_Operator/41_Ternary_Op.js
node chapter_06_Operator/44_Null_Op.js
node chapter_06_Operator/47_Advance_ID_.js
```

## Takeaway

Default to `===` and `??` — they save you from JavaScript's coercion landmines. Memorise pre vs post increment, because every interviewer will ask, and every flaky loop counter bug has its roots right here.
