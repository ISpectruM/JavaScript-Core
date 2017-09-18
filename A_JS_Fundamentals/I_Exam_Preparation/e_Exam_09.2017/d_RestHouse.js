function solve(rooms, couples) {
    let unaccommodated = 0;
    rooms = rooms.map(room => {
        if (room.type === 'double-bedded') {
            room.free = 2;
            room.guests = [];
        } else if (room.type === 'triple') {
            room.free = 3;
            room.guests = [];
            room.gender = ''
        }
        return room;
    });
    for (let couple of couples) {
        let firstGender = couple.first.gender;
        let secondGender = couple.second.gender;
        let coupleGuests = [];

        for (let guest in couple) {
            coupleGuests.push(couple[guest]);
        }
        for (let room of rooms) {
            if (firstGender !== secondGender) {
                if (room.type === 'double-bedded' && room.free === 2) {
                    room.guests.push(coupleGuests.shift());
                    room.guests.push(coupleGuests.shift());
                    room.free = 0;
                    break;
                }
            } else {
                if (room.type === 'triple') {
                    if (room.free === 3) {
                        if (coupleGuests.length === 2) {
                            room.guests.push(coupleGuests.shift());
                            room.guests.push(coupleGuests.shift());
                            room.gender = firstGender;
                            room.free -= 2;
                            break;
                        } else if (coupleGuests.length === 1) {
                            room.guests.push(coupleGuests.shift());
                            room.gender = firstGender;
                            room.free -= 1;
                            break;
                        }
                    } else if (room.free === 2 &&
                        room.gender === firstGender) {
                        if (coupleGuests.length === 2) {
                            room.guests.push(coupleGuests.shift());
                            room.guests.push(coupleGuests.shift());
                            room.free -= 2;
                            break;
                        } else if (coupleGuests.length === 1 &&
                            room.gender === firstGender) {
                            room.guests.push(coupleGuests.shift());
                            room.free -= 1;
                            break;
                        }
                    } else if (room.free === 1 &&
                        room.gender === firstGender) {
                        room.guests.push(coupleGuests.shift());
                        room.free -= 1;
                        if (coupleGuests.length === 0) break;
                    }
                }
            }
        }
        if (coupleGuests.length !== 0) {
            unaccommodated += coupleGuests.length;
        }
    }
    rooms.sort((r1, r2) => r1.number.localeCompare(r2.number))
        .forEach(r => {
        console.log('Room number: ' + r.number);
        r.guests.sort((g1, g2) => g1.name.localeCompare(g2.name))
            .forEach(g => {
                console.log('--Guest Name: ' + g.name);
                console.log('--Guest Age: ' + g.age);
            });
        console.log('Empty beds in the room: ' + r.free);
    });
    console.log('Guests moved to the tea house: ' + unaccommodated)
}

solve([{number: '206', type: 'double-bedded'},
        {number: '311', type: 'triple'}],
    [{
        first: {name: 'Tanya Popova', gender: 'female', age: 24},
        second: {name: 'Miglena Yovcheva', gender: 'female', age: 23}
    },
        {
            first: {name: 'Katerina Stefanova', gender: 'female', age: 23},
            second: {name: 'Angel Nachev', gender: 'male', age: 22}
        },
        {
            first: {name: 'Tatyana Germanova', gender: 'female', age: 23},
            second: {name: 'Boryana Baeva', gender: 'female', age: 22}
        }]
);