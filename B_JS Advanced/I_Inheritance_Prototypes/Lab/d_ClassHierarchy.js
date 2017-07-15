function solve() {
    class Figure{
        constructor(){
            if (new.target === Figure){
                throw new Error("Cannot get instance of abstract class");
            }
        }

        get area(){
            switch (this.constructor){
                case Circle:
                    return Math.pow(this.radius,2) * Math.PI;
                case Rectangle:
                    return this.width * this.height;
            }
        }

        toString(){
            let className = this.constructor.name;
            let properties = Object.getOwnPropertyNames(this);
            return `${className} - ${properties.map(p => `${p}: ${this[p]}`).join(', ')}`
        }
    }

    class Circle extends Figure{
        constructor(radius){
            super();
            this.radius = radius;
        }
    }

    class Rectangle extends Figure{
        constructor(width, height){
            super();
            this.width = width;
            this.height = height;
        }
    }

    return {
        Figure,
        Circle,
        Rectangle
    }
}

let circle = new Circle(3);
console.log(''+circle.area);
let rectangle = new Rectangle(2,3);
console.log(''+ rectangle);