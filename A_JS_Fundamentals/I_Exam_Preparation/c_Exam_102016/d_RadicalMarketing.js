function solve(arr) {
    let persons = new Map();
    arr = arr.filter(e => e!=='');

    for (let input of arr) {
        let name = '';
        let subscribers = '';
        input.length === 1 ? name = input : subscribers = input.split('-');

        if (subscribers !== ''){
            let follower = subscribers[0];
            let name = subscribers[1];

            if (persons.has(name) && persons.has(follower)){
                if(name !== follower &&
                    persons.get(name).get('subs').indexOf(follower) < 0){

                    persons.get(name).get('subs').push(follower);
                    persons.get(follower).get('subTo').push(name);
                }
            }
        } else {
            if (!persons.has(name)) {
                persons.set(name, new Map());
                persons.get(name).set('subs',[]);
                persons.get(name).set('subTo',[]);
            }
        }
    }

    let sorted = [...persons].sort((e1,e2) => {
        let el1Subs = e1[1].get('subs');
        let el2Subs = e2[1].get('subs');
        let el1SubTo = e1[1].get('subTo');
        let el2SubTo = e2[1].get('subTo');
        if (el1Subs.length !== el2Subs.length){
            return el2Subs.length - el1Subs.length;
        } else if (el1SubTo.length !== el2SubTo.length){
            return el2SubTo.length - el1SubTo.length;
        }else {
            return 0;
        }
    });

    let topPerformerName = [...sorted][0][0];
    let topPerformerSubs = [...sorted][0][1].get('subs');

    console.log(topPerformerName);
    if (topPerformerSubs.length > 0){
        let rank = 1;
        topPerformerSubs.forEach(p => {
            console.log(rank+'. ' +p);
            rank++
        })
    }
}

solve([ 'A', 'B', 'C', 'D', 'A-B', 'B-A', 'C-A', 'D-A', '' ]);
solve([
    "J",
    "G",
    "P",
    "R",
    "C",
    "J-G",
    "G-J",
    "P-R",
    "R-P",
    "C-J"
]);