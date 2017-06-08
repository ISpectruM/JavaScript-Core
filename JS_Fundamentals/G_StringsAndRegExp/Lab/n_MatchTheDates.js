function matchDates(strArr) {

    let regex =/\b([0-9]{1,2})[-]([A-Z][a-z]{2})[-]([0-9]{4})\b/g;
    let dates=[];
    for (let str of strArr) {
        while (dates = regex.exec(str)){
            [date,day,month,year] = dates;
            console.log(`${date} (Day: ${day}, Month: ${month}, Year: ${year})`);
        }
    }
}

matchDates(['I am born on 33-Dec-1994.','This is not date: 512-Jan-1996.',
'My father is born on the 29-Jul-1955.']
);
