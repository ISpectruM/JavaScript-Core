function getDNA(length) {
    let chromosomes = ['A','T','C','G','T','T','A','G','G','G'];

    function getPattern(first, second, i) {
        if (i % 4 === 0){
            return `**${first}${second}**`;
        } else if(i % 4 === 1 || i % 4 === 3){
            return `*${first}--${second}*`;
        } else if(i % 4 === 2){
            return `${first}----${second}`
        }
    }

    for (let i = 0; i < length; i++) {
        let counter = i+i;
        let first = chromosomes[counter % chromosomes.length];
        let second = chromosomes[++counter % chromosomes.length];

        console.log(getPattern(first,second,i))
    }
}

getDNA(10);
