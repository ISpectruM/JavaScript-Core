function getBoxesCount(bottles, boxCapacity) {
    let result = bottles/boxCapacity;
    console.log(Math.ceil(result))
}

getBoxesCount(20,5);