class Task {
    constructor(title, deadline) {
        this.title = title;
        this.status = 'Open';
        this.deadline = deadline;
    }

    static comparator(a,b){
        if (!a.isOverdue && !b.isOverdue){

            if(a.status === 'In Progress' && b.status !== 'In Progress') return -1;
            if(a.status !== 'In Progress' && b.status === 'In Progress') return 1;

            if(a.status === 'Open' && b.status !== 'Open') return - 1;
            if(a.status !== 'Open' && b.status === 'Open') return 1;

            if(a.status === 'Complete' && b.status !== 'Complete') return -1;
            if(a.status !== 'Complete' && b.status === 'Complete') return 1;

            return a.deadline - b.deadline;
        }
        else if (a.isOverdue && !b.isOverdue) return -1;
        else if (b.isOverdue && !a.isOverdue) return 1;
        else return a.deadline - b.deadline;
    }

    toString(){
        let isOver = this.isOverdue;
        let currIcon = '';

        let icon={
            "Open": '\u2731',
            "In Progress": '\u219D',
            "Complete": '\u2714',
        };

        if (isOver){
            currIcon = '\u26A0';
        } else {
            currIcon = icon[this._status]
        }

        let result = `[${currIcon}] ${this.title}`;

        if (this._status !== "Complete"){
             result += ` (deadline: `;

            if (isOver){
                result += '(overdue)';
            } else {
                result += `(${this._deadline})`;
            }
        }

        return result;
    }

    get isOverdue() {
        if (this.status === 'Complete'){
            return false;
        }
        return this.deadline < Date.now();
    }


    set deadline(date) {
        if (date < Date.now()){
            throw new Error("Invalid deadline");
        }
        this._deadline = date;
    }

    get deadline() {
        return this._deadline;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }
}

let date1 = new Date();
date1.setDate(date1.getDate() + 7); // Set date 7 days from now
let task1 = new Task('JS Homework', date1);
let date2 = new Date();
date2.setFullYear(date2.getFullYear() + 1); // Set date 1 year from now
let task2 = new Task('Start career', date2);
console.log(task1 + '\n' + task2);
let date3 = new Date();
date3.setDate(date3.getDate() + 3); // Set date 3 days from now
let task3 = new Task('football', date3);
// Create two tasks with deadline set to current time
let task4 = new Task('Task 4', new Date());
let task5 = new Task('Task 5', new Date());
task1.status = 'In Progress';
task3.status = 'In Progress';
task5.status = "Complete";
let tasks = [task1, task2, task3, task4, task5];
setTimeout(() => {
    tasks.sort(Task.comparator);
    console.log(tasks.join('\n'));
}, 1000); // Sort and print one second later

// // should throw an Error
// let overdueTask = new Task('Overdue Task', new Date(2005, '4', '20'));
// // should throw an Error
// task1.deadline = new Date(2005, '4', '20');

