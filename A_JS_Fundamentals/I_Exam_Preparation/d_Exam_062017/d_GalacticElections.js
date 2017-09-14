function solve(ballots) {
    let votesPerSystem = new Map();
    let systemsCandidateVotes = new Map();
    let winners = new Map();
    let totalCandidateVotes = new Map();
    let totalVotes = 0;

    // Collect votes results by system
    for (let ballot of ballots) {
        let system = ballot.system;
        let candidate = ballot.candidate;
        let votes = ballot.votes;
        totalVotes += votes;

        if (!votesPerSystem.has(system)) {
            votesPerSystem.set(system, votes);
            systemsCandidateVotes.set(system, new Map());
            systemsCandidateVotes.get(system).set(candidate, votes);
        } else {
            let currVotes = votesPerSystem.get(system) + votes;
            votesPerSystem.set(system, currVotes);
            if (!systemsCandidateVotes.get(system).has(candidate)) {
                systemsCandidateVotes.get(system).set(candidate, votes);
            } else {
                let currVotes = systemsCandidateVotes.get(system).get(candidate) + votes;
                systemsCandidateVotes.get(system).set(candidate, currVotes);
            }
        }
    }

    //Sort the candidate results by votes to get the winner for particular system
    let sortedVotes = [...systemsCandidateVotes].map(systems => {
        systems[1] = [...systems[1]].sort((c, c1) => {
            return c1[1] - c[1];
        });
        return systems;
    });

    //Get local system winners
    for (let results of sortedVotes) {
        let system = results[0];
        let candidate = results[1][0][0];

        if (!winners.has(candidate)) {
            winners.set(candidate, new Map());
            winners.get(candidate).set(system, votesPerSystem.get(system));

            totalCandidateVotes.set(candidate,votesPerSystem.get(system));
        } else {
            winners.get(candidate).set(system, votesPerSystem.get(system));
            let currVotes = totalCandidateVotes.get(candidate);
            totalCandidateVotes.set(candidate, currVotes + votesPerSystem.get(system));
        }
    }

    //Show election results
    if (winners.size === 1){
        //Show when single candidate wins the elections
        let winner = [...winners][0][0];
        let winnerVotes = totalCandidateVotes.get(winner);
        console.log(`${winner} wins with ${winnerVotes} votes
${winner} wins unopposed!`);
    } else {
        let top = getTopResult(totalCandidateVotes);
        let runnerUp = getTopResult(totalCandidateVotes);

        let winningPercentage = Math.floor((top[1] / totalVotes)*100);
        //If there is definite winner with more than a half of total results
        if (winningPercentage > 50){
            let result = `${top[0]} wins with ${top[1]} votes\n` +
                            `Runner up: ${runnerUp[0]}\n`;

            let runnerSystems = [...winners.get(runnerUp[0])].sort((e,e1) => {
                return e1[1] - e[1];
            });
            runnerSystems.forEach(s => {
                result += s[0] + ': ' + s[1] + '\n';
            });
            console.log(result);
        } else {
            //If there isn`t definite winner
            let runnerResult = Math.floor((runnerUp[1] / totalVotes)*100);
            console.log('Runoff between ' + top[0]+ ' with ' + winningPercentage + '% and ' + runnerUp[0] + ' with ' + runnerResult + '%');
        }
    }

    function getTopResult(candidatesTotalVotes) {
        let sorted = [...candidatesTotalVotes].sort((winner,winner1) => {
            return winner1[1] - winner[1];
        });
        let top = sorted[0];

        candidatesTotalVotes.delete(top[0]);

        return top;
    }
}

solve([{ system: 'Theta', candidate: 'Kim Jong Andromeda', votes: 10 },
        { system: 'Tau',   candidate: 'Kim Jong Andromeda', votes: 200 },
        { system: 'Tau',   candidate: 'Flying Shrimp',      votes: 150 }
    ]
);