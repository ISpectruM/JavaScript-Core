class Entity{
    constructor(name){
        if (new.target === Entity){
            throw new Error("Cannot instantiate directly");
        }
        this.name = name;
    }

    saySomething(){
        return '';
    }
}

module.exports = Entity;