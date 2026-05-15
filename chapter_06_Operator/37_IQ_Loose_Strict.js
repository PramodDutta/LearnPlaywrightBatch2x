console.log(0 == "");
console.log(0 == "0");
console.log("" == "0");  //  🤯 (transitivity broken!)


console.log(0 == false);
console.log(null == 0);
console.log(null == undefined);
console.log(null === undefined);