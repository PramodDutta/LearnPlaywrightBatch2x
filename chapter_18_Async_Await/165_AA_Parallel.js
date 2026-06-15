// When Step 2 depends on Step 1's result, you MUST run them sequentially.

// Ste1 - Step 2


function apiCall(name) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(name, "200 Ok")
        }, 2000);
    })
}

async function parallelTest() {

    let [r1, r2, r3] = await Promise.allSettled([

        apiCall("Auth Service"),
        apiCall("User Account Creation"),
        apiCall("Support Page API")

    ])

    console.log(r1);
    console.log(r2);
    console.log(r3);

}

parallelTest();