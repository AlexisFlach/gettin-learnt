class Dog {
    constructor(name) {
        this.name = name;
    }

    bark() {
        return "Voff!!";
    }
}

Dog.prototype.play = () => console.log("Playing!!");

const dog = {
    bark() {
        return "Voff!!"
    }
}

const pet1 = Object.create(dog);