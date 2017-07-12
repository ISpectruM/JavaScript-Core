
function nextDay(y, m, d) {
    let date = new Date(y,m-1,d);
    date.setDate(date.getDate()+1);
    console.log(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
}

nextDay(2016, 9, 30);