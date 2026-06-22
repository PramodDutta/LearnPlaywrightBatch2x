# `export` vs `export default` — Named & Default Exports

Two ways a module shares code: **named export** (non-default) and **default export**.
This chapter shows both. Files involved:

| File | Exports | Kind |
|------|---------|------|
| [utils.js](../utils.js) | `BASE_URL`, `formatTestName` | named |
| [testutils.js](../testutils.js) | `BASE_URL`, `formatUpperCaseString` | named |
| [logger.js](../logger.js) | `log` (default) + `log2` (named) | both |
| [169_Utils.js](169_Utils.js) | — imports named | consumer |
| [170_Logger.js](170_Logger.js) | — imports default | consumer |

---

## 1. Named export (non-default)

Use the `export` keyword right on the declaration. A module can have **many** named exports.

```js
// utils.js
export let BASE_URL = "https://api.staging.com";

export function formatTestName(name) {
    return "TC_" + name.toUpperCase();
}
```

### Import — name must MATCH, use `{ }`

```js
// 169_Utils.js
import { BASE_URL, formatTestName } from "../utils.js";
```

Rules:
- Wrap names in curly braces `{ }`.
- Imported name **must match** the exported name exactly.
- Import only what you need (tree-shake friendly).

### Rename with `as`

Two files both export `BASE_URL`. Name clash. Fix = alias with `as`:

```js
// 169_Utils.js
import { BASE_URL as bul_util, formatTestName } from "../utils.js";
import { BASE_URL as bul_testtul, formatUpperCaseString } from "../testutils.js";

console.log(bul_util);      // https://api.staging.com
console.log(bul_testtul);   // https://app.vwo.com
console.log(formatTestName("login")); // TC_LOGIN
```

`as` renames the binding so both `BASE_URL` values coexist.

---

## 2. Default export

Mark **one** export per module as the default with `export default`.

```js
// logger.js
export default function log(message) {
    console.log("[LOG] - default " + message);
}

export function log2(message) {   // also a NAMED export
    console.log("[LOGS] " + message);
}
```

### Import — NO braces, name is YOURS

```js
// 170_Logger.js
import log from "../logger.js";

log("starting the test cases"); // [LOG] - default starting the test cases
```

Rules:
- **No** curly braces for the default.
- Pick **any** name on import — not tied to original. `import logger from "../logger.js"` works the same.
- Only **one** default export allowed per file.

### Mixing default + named in one import

`logger.js` has a default (`log`) AND a named (`log2`). Grab both:

```js
import log, { log2 } from "../logger.js";

log("hi");   // default  -> [LOG] - default hi
log2("hi");  // named    -> [LOGS] hi
```

Default first (no braces), named after (in braces).

---

## 3. Side-by-side

| Feature | Named export | Default export |
|---------|--------------|----------------|
| Keyword | `export` | `export default` |
| Per file | many allowed | only **one** |
| Import syntax | `import { x } from` | `import x from` |
| Braces | yes `{ }` | no |
| Import name | must match (or alias via `as`) | any name you choose |
| Rename | `import { x as y }` | just write a different name |
| Best for | utility collections, multiple helpers | the module's single main thing |

---

## 4. Quick rules of thumb

- Many helpers in a module → **named exports**.
- One clear "main" thing the module IS → **default export**.
- Name collision across modules → alias named imports with `as`.
- A file can do both (see `logger.js`); the default is the headline, named exports are extras.
