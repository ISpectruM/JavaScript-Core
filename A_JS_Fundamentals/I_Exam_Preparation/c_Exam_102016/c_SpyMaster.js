function solve(arr) {
    let specialKey = arr.shift();

    let messagePattern = /^[!%$#A-Z]{8,}$/;
    let regex = "(( |^)" + specialKey + "[ ]+)([!%$#A-Z]{8,})(?=\\.|,| |$)";
    let pattern = new RegExp(regex,'gmi');

    for (let string of arr) {
        string = string.replace(pattern, replacer);
        console.log(string);
    }

    function replacer(match, gr1, gr2, gr3) {
        if (messagePattern.test(gr3)) {
            gr3=gr3.split('').map(ch => {
                switch (ch) {
                    case '!':
                        return 1;
                    case '%':
                        return 2;
                    case '#':
                        return 3;
                    case '$':
                        return 4;
                    default:
                        return ch.toLowerCase();
                }
            }).join('');
            return gr1+gr3;
        }
        return match;
    }
}

solve([
    "tricky",
    "Tricky CAREFULL!#$%; with what you decode Tricky CAREFULL!#$%",
    "Tricky HERECOMESDASH- with what you decode Tricky HERECOMESDASH -",
    "Try again stricky NOTTHEFIRSTONE  tricky NOTTHEFIRSTONE",
    "Be very carefull now trICkY plainwrong, trICkY PLAINWRONG",
    "next challenge (tRickY SOME$WORDS) tRickY SOME$WORDS",
    "It's tricky TOUSETHECORRECTREPLACE? tricky TOUSETHECORRECTREPLACE ,",
    "now with commas triCky RAND!$OM%$#TE!#XT, triCky RAND!$OM%$#TE!#XT.",
    "DON'T match this plz TRICKY | TEXT#TEXT. TRICKY  TEXT#TEXT.",
    "Try with commas -triCkY COMMAHERE, triCkY COMMAHERE, wow"
]);