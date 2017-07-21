class SortedList{
    constructor(){
        this.internalArray = [];
        this.size = 0;
    }

    add(element) {
        this.internalArray.push(element);
        this._size++;
        this.internalArray.sort((a, b) => a-b);
    }
    remove(index){
        if (index >= 0 && index < this.internalArray.length){
            this.internalArray = this.internalArray.filter((e, i) => i !== index);
            this._size--;
        }
    }
    get(index) {
        if (index >= 0 && index < this.internalArray.length){
            return this.internalArray[index];
        }
    }
}
