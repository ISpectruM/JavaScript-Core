/**
 * Created by Iv on 23-May-17.
 */

function filterAge(minAge,firstName, firstAge, secName, secAge) {
    let firstPerson = {name: firstName, age: firstAge};
    let secPerson = {name:secName, age:secAge};

    if (firstPerson.age >= minAge){
        console.log(firstPerson);
    }
    if (secPerson.age >= minAge){
        console.log(secPerson);
    }
}