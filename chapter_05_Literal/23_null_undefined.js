// ============================================================
// Topic: null vs undefined in JavaScript
// File: 23_null_undefined.js
// ============================================================

/*
  SIMPLE DEFINITIONS:

  undefined  ->  A variable exists, but it has not been assigned any value yet.
                 JavaScript itself sets this automatically.

  null       ->  A variable exists, but the developer explicitly assigns "no value" or "empty".
                 It is intentional absence of any value.
*/


// --------------------------------------------------------
// 1. undefined
// --------------------------------------------------------

let userName; // declared but not assigned
console.log(userName);        // undefined
console.log(typeof userName); // "undefined"

function greet() {
    // no return statement
}
console.log(greet());         // undefined


// --------------------------------------------------------
// 2. null
// --------------------------------------------------------

let profilePicture = null; // developer explicitly says "no picture yet"
console.log(profilePicture);        // null
console.log(typeof profilePicture); // "object"  <-- known JS quirk!

let score = 100;
score = null; // developer clears the value intentionally
console.log(score); // null


// --------------------------------------------------------
// 3. Key Differences (Summary Table)
// --------------------------------------------------------

/*
  | Feature              | undefined                     | null                           |
  |----------------------|-------------------------------|--------------------------------|
  | Meaning              | Not assigned yet              | Intentionally empty            |
  | Who sets it?         | JavaScript automatically      | Developer manually             |
  | Type                 | undefined                     | object (historical bug in JS)  |
  | == comparison        | null == undefined  -> true    |                                |
  | === comparison       | null === undefined -> false   |                                |
*/


// --------------------------------------------------------
// 4. Practical Comparisons
// --------------------------------------------------------

let a;
let b = null;

console.log(a == b);   // true  (loose equality sees them as similar)
console.log(a === b);  // false (strict equality: different types)

console.log(typeof a); // "undefined"
console.log(typeof b); // "object"


// --------------------------------------------------------
// 5. When to use what?
// --------------------------------------------------------

/*
  Use undefined:
  - When checking if a variable/property has been initialized.
  - Let JS handle it; don’t assign undefined manually.

  Use null:
  - When you want to deliberately clear or reset a value.
  - When a function should return "nothing" on purpose.
  - To represent an empty or unknown object reference.
*/


// --------------------------------------------------------
// 6. Quick Check Function
// --------------------------------------------------------

function checkValue(value) {
    if (value === undefined) {
        return "Value is undefined (not assigned yet)";
    }
    if (value === null) {
        return "Value is null (explicitly empty)";
    }
    return "Value is: " + value;
}

console.log(checkValue());           // undefined
console.log(checkValue(null));       // null
console.log(checkValue("hello"));    // hello


// ============================================================
// END
// ============================================================
