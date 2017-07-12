/**
 * Created by Iv on 23-May-17.
 */
function concatenate(number) {
    let result = "";

    for (let i=1; i<= number; i++){
        result += i;
    }

    console.log(result);
}

concatenate(11);