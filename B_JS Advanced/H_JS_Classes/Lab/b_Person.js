class Person {
    constructor(firstName,lastName,age,email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
    }

    toString(){
        return `${this.firstName} ${this.lastName} (age: ${this.age}, email: ${this.email})`;
    }
}
let person = new Person('Iv','Mironov',23,'asd@asd.bg');
let person1 = new Person('Iv0','Mironov',28 ,'asd@asd.bg');
console.log(''+person);