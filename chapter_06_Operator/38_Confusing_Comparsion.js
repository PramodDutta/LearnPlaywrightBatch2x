console.log("38 — Confusing Comparisons in JS");
// ============================================================
// 38 — Confusing Comparisons in JS:  ==  vs  ===
// ============================================================
//
// Rule of thumb:
//   ==   → loose equality  (does type coercion, surprising)
//   ===  → strict equality (no coercion, what you usually want)
//
// Run with:  node 38_Confusing_Comparsion.js
// ============================================================


// ---------- 1. Empty string vs 0 vs "0"  (transitivity broken) ----------
console.log("" == 0);        // true   → "" coerced to Number → 0
console.log("0" == 0);       // true   → "0" coerced to Number → 0
console.log("" == "0");      // false  → both strings, compared as-is

// === fixes it
console.log("" === 0);       // false
console.log("0" === 0);      // false
console.log("" === "0");     // false


// ---------- 2. null and undefined ----------
console.log(null == undefined);   // true   → special rule in ==
console.log(null === undefined);  // false  → different types
console.log(null == 0);           // false  → null only == undefined/null
console.log(null >= 0);           // true   → >= coerces null to 0  (gotcha!)
console.log(null > 0);            // false
console.log(null == 0 || null > 0); // false … but null >= 0 is true 🤯


// ---------- 3. Booleans coerce to numbers ----------
console.log(true == 1);      // true
console.log(true == "1");    // true   → "1" → 1, true → 1
console.log(false == 0);     // true
console.log(false == "");    // true   → both → 0
console.log(false == "0");   // true   → "0" → 0, false → 0
console.log(true === 1);     // false  → different types


// ---------- 4. NaN — never equal to anything, even itself ----------
console.log(NaN == NaN);     // false
console.log(NaN === NaN);    // false
console.log(Number.isNaN(NaN));  // true  ← correct way to check


// ---------- 5. Object vs primitive ----------
console.log([] == false);    // true   → [] → "" → 0, false → 0
console.log([] == 0);        // true   → [] → "" → 0
console.log([] == "");       // true   → [] → ""
console.log([0] == false);   // true   → [0] → "0" → 0
console.log([1] == true);    // true   → [1] → "1" → 1
console.log([1, 2] == "1,2"); // true   → array toString
console.log({} == {});       // false  → different references
console.log([] == []);       // false  → different references


// ---------- 6. String to number traps ----------
console.log(" " == 0);       // true   → " " trimmed → "" → 0
console.log("\n\t" == 0);    // true   → whitespace → 0
console.log("0x10" == 16);   // true   → hex string parsed
console.log("1e2" == 100);   // true   → scientific notation


// ---------- 7. The infamous trio ----------
console.log(null == false);       // false  ← surprise! null only == undefined
console.log(undefined == false);  // false  ← same here
console.log(undefined == 0);      // false


// ---------- 8. typeof results (always strings) ----------
console.log(typeof null);          // "object"  (legacy bug)
console.log(typeof undefined);     // "undefined"
console.log(typeof NaN);           // "number"
console.log(typeof null === "object");      // true
console.log(typeof undefined === "undefined"); // true

// NaN = not a Number


// ---------- 10. Quick interview cheats ----------
// "" == 0           → true
// "" == "0"         → false
// 0 == "0"          → true
// null == undefined → true
// null == 0         → false   but   null >= 0 → true
// NaN == NaN        → false
// [] == ![]         → true   (![] → false → 0; [] → "" → 0)
console.log([] == ![]);   // true 🤯


// ============================================================
// TAKEAWAY:  Always use ===  (and !==).
// Use ==  only for null/undefined check:   if (x == null) { ... }
// Use Object.is for NaN and -0 edge cases.
// ============================================================
