function filter(name,mail,phone,strArr) {
    strArr.forEach( sentence => {
        sentence = sentence.replace(/<![a-zA-Z]+!>/g,name);
        sentence = sentence.replace(/<@[a-zA-Z]+@>/g,mail);
        sentence = sentence.replace(/<\+[a-zA-Z]+\+>/g,phone);

        console.log(sentence);
    });
}
