function employees() {

    class Employee {
        constructor(name, age) {
            if (new.target === Employee) {
                throw new Error("Cannot instantiate abstract class");
            }
            this.name = name;
            this.age = age;
            this.salary = 0;
            this.tasks = [];
        }

        work() {
            let curtask = this.tasks.shift();
            console.log(curtask);
            this.tasks.push(curtask);
        }

        collectSalary() {
            console.log(`${this.name} received ${this.getSalary()} this month.`);
        }

        getSalary() {
            return this.salary;
        }
    }

    class Junior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks = [`${this.name} is working on a simple task.`]
        }
    }

    class Senior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks = [`${this.name} is working on a complicated task.`,
                `${this.name} is taking time off work.`,
                `${this.name} is supervising junior workers.`
            ]
        }
    }

    class Manager extends Employee {
        constructor(name, age) {
            super(name, age);
            this.dividend = 0;
            this.tasks = [`${this.name} scheduled a meeting.`,
                `${this.name} is preparing a quarterly report.`
            ];
        }

        getSalary() {
            return this.salary + this.dividend;
        }
    }

    return{
        Employee,
        Junior,
        Senior,
        Manager
    }
}

let Manager = employees();
managerEm = new Manager.Manager('i',34);
console.log(managerEm);
managerEm.divident = 300;
managerEm.salary = 300;
console.log(managerEm.collectSalary());
managerEm.work();
console.log(managerEm.hasOwnProperty('dividend'));