// async function sayHello() {
//     return "Hello, QA!";
// }

// sayHello().then(function (msg) {
//     console.log(msg);
// });

// async function getStatus() {
//     let status = await Promise.resolve(200);
//     console.log("Status code:", status);
// }

// getStatus();


async function testFlow() {
    let step1 = await Promise.resolve("Opened browser");
    console.log(step1);

    let step2 = await Promise.resolve("Clicked login");
    console.log(step2);

    let step3 = await Promise.resolve("Verified dashboard");
    console.log(step3);
}

testFlow();