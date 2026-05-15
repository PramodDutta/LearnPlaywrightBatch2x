// ============================================================
// Topic: Single Quote vs Double Quote vs Backtick in JS
// File: 29_Backtick_single_double.js
// ============================================================

/*
  ONE SIMPLE EXPLANATION:

  Single ('') and Double ("") quotes are almost the same — both create simple strings.
  Backticks (``) are special — they allow variables inside (${}) and multi-line text.

  Think of it like this:
  - '' or "" -> Plain text
  - ``       -> Smart text (can inject values & line breaks)
*/


// --------------------------------------------------------
// 1. Single Quotes
// --------------------------------------------------------
let single = 'Hello World';
console.log("Single Quote:", single);


// --------------------------------------------------------
// 2. Double Quotes
// --------------------------------------------------------
let double = "Hello World";
console.log("Double Quote:", double);

// NOTE: Single and Double are identical in behavior.
// Use whichever you prefer, just be consistent.


// --------------------------------------------------------
// 3. Backticks (Template Literals)
// --------------------------------------------------------
let name = "Harish";
let age = 25;

// Variable interpolation
let greeting = `Hello, my name is ${name} and I am ${age} years old.`;
console.log("Backtick with variable:", greeting);

// Multi-line string
let multiLine = `
  Line 1
  Line 2
  Line 3
`;
console.log("Backtick multi-line:", multiLine);

// Expression inside ${}
let sum = `10 + 20 = ${10 + 20}`;
console.log("Backtick expression:", sum);


// --------------------------------------------------------
// 4. Quick Comparison
// --------------------------------------------------------

/*
  Feature              |  '' or ""  |  ``
  ---------------------|------------|------------
  Simple text          |     ✓      |   ✓
  Variable injection   |     ✗      |   ✓  -> ${var}
  Multi-line           |     ✗      |   ✓
  Expression inside    |     ✗      |   ✓  -> ${a + b}
*/


// --------------------------------------------------------
// 5. Real Example
// --------------------------------------------------------

let product = "Laptop";
let price = 50000;

// Old way (using + to combine)
let oldWay = "The " + product + " costs " + price + " rupees.";

// New way (using backticks)
let newWay = `The ${product} costs ${price} rupees.`;

console.log("Old way:", oldWay);
console.log("New way:", newWay);


// ============================================================
// END
// ============================================================
