function orderUsernames(arrStr) {
    let usernames = new Set();
    let sortedNames = arrStr.sort((n1,n2) => {
        if (n1.length !== n2.length){
            return n1.length - n2.length;
        } else {
            if (n1 < n2) {
                return -1;
            } else if (n1 > n2){
                return 1;
            }
            return 0;
        }
    });

    for (let name of sortedNames) {
        usernames.add(name);
    }
    console.log([...usernames].join('\n'));
}
 orderUsernames([
     'Ashton',
     'Kutcher',
     'Ariel',
     'Lilly',
     'Keyden',
     'Aizen',
     'Billy',
     'Braston'

 ]);