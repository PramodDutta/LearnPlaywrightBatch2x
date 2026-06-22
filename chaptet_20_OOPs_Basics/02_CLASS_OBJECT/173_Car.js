class Car {
    // CAB
    //  Constructor. 
    constructor(name_given_during_obj_creation) {
        this.name = name_given_during_obj_creation;
    }
    // Attribute 
    // Behavior. 
    drive() {
        console.log("i am driving", this.name);
    }

}

const tesla = new Car("Model S");
tesla.drive();

const i10 = new Car("grand is10");
i10.drive();