function getString(name: string): string {
    return "Amit";
}

getString("pramod");
// getFirstResult(123);

function getFirstResult<T>(resuts: T[]) {
    return resuts[0]!; //The ! — non-null assertion operator

    function getFirstResult<T>(resuts: T[]) {
        return resuts[0]!;   // ← "trust me, not null/undefined"
    }
    // !tells the compiler: "this value is NOT null or undefined — stop warning me." Compile - time only.Zero runtime effect(strips out in compiled JS).
}

let firstCode = getFirstResult<number>([200, 400, 500]);
let firstTest = getFirstResult<string>(["Login", "Signup", "Cart"]);

console.log("First code:", firstCode);
console.log("First test:", firstTest);