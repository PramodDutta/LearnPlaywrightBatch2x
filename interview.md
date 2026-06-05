# JavaScript Interview Notes

Curated interview questions + answers from this curriculum.

---

## Objects

### Q: Why declare object references with `const` instead of `let`/`var`?

**Short answer:** A variable holds a *reference* to the object, not the object
itself. `const` locks the binding (which object the variable points to), **not**
the object's contents. Since the reference almost never needs reassignment, `const`
is the correct default.

**`const` allows mutation of contents:**

```js
const obj1 = { a: 1, b: 2 };
obj1.a = 99;          // OK — mutate existing property
obj1.c = 3;           // OK — add property
delete obj1.b;        // OK — remove property
console.log(obj1);    // { a: 99, c: 3 }
```

**`const` blocks only reassignment of the binding:**

```js
const obj1 = { a: 1, b: 2 };
obj1 = { x: 5 };      // ❌ TypeError: Assignment to constant variable.
```

**Why this is the preferred style:**

| Reason | Explanation |
|--------|-------------|
| Reference rarely changes | You mutate properties or spread into a new variable; the binding stays fixed for its whole life. |
| Catches bugs | Accidental `obj1 = somethingElse` throws instead of silently overwriting. |
| Clear intent | `const` signals to the reader that the binding is stable. |
| Favors immutability | Encourages new objects via spread instead of reassignment. |

**Need a changed copy? Spread into a new `const` — don't reassign:**

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };   // new object, new const binding
```

**When `let`/`var` *is* justified — the binding itself is reassigned:**

```js
let current = { id: 1 };
current = { id: 2 };   // points to a different object — let needed
```

This is rare for plain object literals, so **default to `const`**.

**One gotcha:** `const` is shallow. It does not freeze the object. Use
`Object.freeze(obj)` to prevent mutation of contents.

```js
const frozen = Object.freeze({ a: 1 });
frozen.a = 99;        // silently ignored (throws in strict mode)
console.log(frozen);  // { a: 1 }
```
