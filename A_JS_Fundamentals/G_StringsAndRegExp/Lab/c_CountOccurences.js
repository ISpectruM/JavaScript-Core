function getOccurences(str,txt) {
    let count = 0;
    let index =0;

    index = txt.indexOf(str);
    while (index !== -1){
        count++;
        index++;
        index =txt.indexOf(str,index);
    }

    console.log(count);
}
getOccurences('ma', 'Marine mammal training is the training and caring for marine life such as, dolphins, killer whales, sea lions, walruses, and other marine mammals. It is also a duty of the trainer to do mental and physical exercises to keep the animal healthy and happy.');


