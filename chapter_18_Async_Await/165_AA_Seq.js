// When Step 2 depends on Step 1's result, you MUST run them sequentially.

// Ste1 - Step 2


function apiCall(name) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(name, "200 Ok")
        }, 2000);
    })
}

async function seqTest() {

    console.log("Starting of the Test");
    let start = Date.now();

    let r1 = await apiCall("Login");
    console.log(r1);

    let r2 = await apiCall("Dashboard");
    console.log(r2);

    let r3 = await apiCall("Report");
    console.log(r3);

    console.log("Time: ~" + (Date.now() - start) + "ms");


}

seqTest();