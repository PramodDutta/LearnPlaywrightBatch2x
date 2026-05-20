// You are working API Validation
// response Code - 200, 404, 401, 403.....404


let responseCode = 404;

switch (responseCode) {

    case 200:
        console.log("200 Ok");
        break;
    case 404:
        console.log("404 Not found!");
        break;
    default:
        console.log("Not status code match");

}