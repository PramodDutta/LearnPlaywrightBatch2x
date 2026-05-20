# Chapter 3 — Identifiers, Literals & Comments

This chapter locks down the rules for naming things in JavaScript — what the parser accepts, what the team accepts, and what your future self will thank you for. We cover identifier syntax (`$`, `_`, no leading digit, no reserved words, Unicode), the five common naming conventions (camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE, Hungarian), and the three flavors of comments (`//`, `/* */`, JSDoc `/** */`). Two cheat-sheets for VS Code shortcuts ship alongside so SDETs can move at editor speed.

## Files

| File | Topic | What it shows |
|------|-------|---------------|
| `06_Identifier_Rules.js` | Identifier basics | Valid starts (`$`, `_`, letter), invalid leading digit, case sensitivity (`Name` vs `name`) |
| `07_Identifier_Part2.js` | Naming conventions | camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE, Hungarian notation |
| `08_Comments.js` | Comments | Single-line `//`, multi-line `/* */`, JSDoc `/** */` |
| `js_identifier_rules.js` | All-in-one reference | Full identifier ruleset + Unicode + every naming convention with `console.log` output |
| `VS_Code_keyboard_shortcut_mac.md` | Editor shortcuts | macOS VS Code keybindings reference |
| `VS_Code_keyboard_shortcut_windows.md` | Editor shortcuts | Windows VS Code keybindings reference |

## Concepts covered

- **Identifier rules**
  - Must begin with a **letter**, **`_` underscore**, or **`$` dollar sign**
  - Subsequent characters may include **digits**
  - **Cannot** start with a digit (`1stPlace` -> SyntaxError)
  - **Cannot** be a reserved keyword (`class`, `const`, `function`, ...)
  - **Case-sensitive**: `myVar`, `myvar`, `MyVar` are three different identifiers
  - Unicode letters allowed: `café`, `变量`, `A`
  - No spaces, hyphens, or special chars other than `_` and `$`
- **Naming conventions**
  - `camelCase` -> variables & functions (`userName`, `getUserInfo`)
  - `PascalCase` -> classes & constructors (`UserProfile`, `Person`)
  - `snake_case` -> underscore-separated (`user_name`)
  - `SCREAMING_SNAKE_CASE` -> constants (`MAX_SIZE`, `API_KEY`)
  - Hungarian notation -> legacy type-prefix (`strName`, `bActive`, `nCount`, `arrItems`)
- **Comments**
  - `//` single-line
  - `/* ... */` multi-line block
  - `/** ... */` JSDoc (tooling-friendly)
- **Reserved words** cannot be used as identifiers (e.g., `class`, `const`, `function`).

---

### 06_Identifier_Rules.js

Shows that identifiers can start with `$`, `_`, or a letter and demonstrates case-sensitivity (`Name` vs `name`). The commented-out lines flag what the parser rejects — leading digit and spaces.

```js
var $ = 10;
var _a = 12;
var p = 10;

var ab123 = 34;

// var 123 = 123;

var Name = "pramod";
var name = "Amit";
//var pramod dutta = "hello";
var pramod_dutta = "hello";
var pramod$dutta = "hello";
var pramodu1232 = "hello";
```

Expected output:

```bash
# No console.log — file runs silently with no output.
# Uncommenting `var 123 = 123;` or `var pramod dutta = ...` throws SyntaxError.
```

---

### 07_Identifier_Part2.js

Walks the five naming conventions side-by-side so you can pick the right style for variables, classes, constants, and legacy code.

```js
var name = "Pramod";

var firstName = "Pramod";
var lastName = "Dutta"; // CamelCase

var first_name = "Amit"; // Snake Case

// Naming Conventions (Cases)
// ============================================
// 1. camelCase (standard for JS variables and functions)
let userName = "camelCase";
let totalPrice = 99.99;
let isLoggedIn = true;



// 2. PascalCase (standard for JS classes and constructors)
let UserProfile = "PascalCase";
let ShoppingCart = "class name style";



// 3. snake_case (underscore separated)
let user_name = "snake_case";
let total_price = 49.99;
let is_logged_in = false;


// 4. SCREAMING_SNAKE_CASE (constants)
const MAX_SIZE = 100;
const API_KEY = "abc123";
const DATABASE_URL = "localhost";


// 5. Hungarian Notation (prefix with type - older style)
let strName = "string prefix";
let bActive = true;       // boolean
let nCount = 5;           // number
let arrItems = [];        // array
```

Expected output:

```bash
# No console.log — declarations only. Runs silently.
```

---

### 08_Comments.js

Demonstrates the three comment styles and shows how comments are completely ignored by the engine.

```js
// This is sinle comment this will be ignore 
// this line will be not executed


/*
 *  This is multi line
 *  Author : Prrmmod Dutta
 *  Date : 14-Feb-2026
 */

/**
 *  This is multi line
 *  Author : Prrmmod Dutta
 *  Date : 14-Feb-2026
 **/

// var g = 10;

var a = 10
```

Expected output:

```bash
# No console.log — only a variable assignment. Runs silently.
```

---

### js_identifier_rules.js

The chapter's all-in-one reference: every rule, Unicode identifiers, every naming convention, and `console.log` calls that actually print.

```js
// ============================================
// JavaScript Identifier Rules - Single Example
// ============================================

// 1. Must begin with a letter, underscore, or dollar sign
let validName = "starts with letter";
let _private = "starts with underscore";
let $jquery = "starts with dollar sign";

// 5. Identifiers are CASE-SENSITIVE
let myVar = "lowercase v";
let myvar = "lowercase v"; // Different identifier!
let MyVar = "uppercase M"; // Another different identifier!
console.log(myVar !== myvar); // true
console.log(myVar !== MyVar); // true

// 6. Unicode letters and Unicode escape sequences are allowed
let café = "Unicode letter é";
let 变量 = "Chinese characters";
let A = "Unicode escape for A"; // Equivalent to: let A = ...
let _ = "Unicode escape for _"; // Equivalent to: let _ = ...
```

Expected output:

```bash
true
true

=== Valid Identifiers ===
starts with letter
starts with underscore
starts with dollar sign
letter then digit
dollar then digits
mixed letters digits underscore

=== Case Sensitivity Demo ===
myVar: lowercase v
myvar: lowercase v
MyVar: uppercase M

=== Unicode Identifiers ===
café: Unicode letter é
变量: Chinese characters
A: Unicode escape for A

=== Naming Conventions ===
camelCase: camelCase 99.99 true function camelCase
PascalCase: PascalCase class name style constructor
snake_case: snake_case 49.99 false
SCREAMING_SNAKE_CASE: 100 abc123 localhost
Hungarian Notation: string prefix true 5 []
```

---

### VS Code shortcuts

Two cheat-sheets ship with this chapter — pick your OS and start moving faster:

- macOS -> [`VS_Code_keyboard_shortcut_mac.md`](./VS_Code_keyboard_shortcut_mac.md)
- Windows -> [`VS_Code_keyboard_shortcut_windows.md`](./VS_Code_keyboard_shortcut_windows.md)

Common high-value ones: Command Palette (`Cmd/Ctrl + Shift + P`), Toggle Line Comment (`Cmd/Ctrl + /`), Multi-cursor (`Cmd/Ctrl + D`), Toggle Terminal (`` Ctrl + ` ``).

## How to run

```bash
cd chapter_03_Identifier_Literals
node 06_Identifier_Rules.js
node 07_Identifier_Part2.js
node 08_Comments.js
node js_identifier_rules.js
```

Only `js_identifier_rules.js` prints output — the others define variables silently. Uncomment the SyntaxError lines to watch the parser yell at you.

## Takeaway

Identifiers in JS are simple: start with letter/`_`/`$`, no digits up front, no reserved words, and they're case-sensitive. Pick a convention per role (camelCase for vars, PascalCase for classes, SCREAMING_SNAKE_CASE for constants) and stick to it — readable test code is debuggable test code.
