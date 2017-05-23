/**
 * Created by Iv on 23-May-17.
 */



function calculateVat(numbers) {
    let sum =0;
    for (let num of numbers){
        sum += Number(num);
    }
    let vat = sum*0.2;

    console.log(`sum = ${sum}`);
    console.log(`vat = ${vat}`);
    console.log(`total = ${sum+vat}`);
}

calculateVat([1.20, 2.60, 3.50]);

