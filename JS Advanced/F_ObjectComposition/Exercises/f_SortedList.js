function getSortedList() {
    return {
        internalArray:[],
        size: 0,
        add: function (element) {
            this.internalArray.push(element);
            this.size++;
            this.internalArray.sort((a, b) => a-b);
        },
        remove: function(index){
           if (index >= 0 && index < this.internalArray.length){
               this.internalArray = this.internalArray.filter((e, i) => i !== index);
               this.size--;
           }
        },
        get: function (index) {
            if (index >= 0 && index < this.internalArray.length){
                return this.internalArray[index];
            }
        },
    };
}

let sortedList = getSortedList();
sortedList.add(3);
sortedList.add(5);
sortedList.add(1);
console.log(sortedList.toString());
console.log(sortedList.size);
sortedList.remove(1);
console.log(sortedList.toString());
console.log(sortedList.size);
console.log(sortedList.get(1));
