
class TestCase {

    constructor(name, status, priority) {
        this.name = name;
        this.status = status;
        this.priority = priority;
    }
    display() { // Method
        console.log(this.name + " → " + this.status + " → " + this.priority);
    }
}

// Function
function f1() {

}

let loginTC = new TestCase("Login Test", "Pass", "P0");
let signUpTC = new TestCase("Signup TC", "Fail", "P1");

loginTC.display();

// Function vs Method
// method is functions but inside the class :)