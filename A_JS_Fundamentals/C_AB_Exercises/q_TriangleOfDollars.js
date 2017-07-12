function triangle(n) {
    let result = '';
    for(let row = 1; row <= n;row++){
        for(let col = 1; col <= row; col++){
            result+='$';
        }
        result+='\n'
    }
    console.log(result);
}

function triangle1(n) {

    for(let i = 1; i <=n;i++){
        let arr = new Array(i+1).join('$')
        console.log(arr)
    }
}

function triangle2(n) {
    for(let i = 1; i <=n;i++){
        console.log('$'.repeat(i));
    }
}

triangle2(5);