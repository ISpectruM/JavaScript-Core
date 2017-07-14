function manage(descriptions, sorting) {
    class Ticket{
        constructor(destination, price, status){
            this.destination = destination;
            this.price = Number(price);
            this.status = status;
        }
    }

    let tickets = [];

    for (let description of descriptions) {
        let tokens  = description.split('\|');
        tickets.push(new Ticket(tokens[0],tokens[1],tokens[2]));
    }


    function sortTickets(criteria) {

        return tickets.sort((t1,t2) => {
            let firstT = t1[criteria];
            let secondT = t2[criteria];
            if(firstT < secondT) return -1;
            else if(firstT > secondT) return 1;
            else return 0;
        });
    }
    return sortTickets(sorting);
}

console.log(manage(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'status'
));