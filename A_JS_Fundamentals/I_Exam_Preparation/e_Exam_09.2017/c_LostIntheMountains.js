function solve(keyword,text) {
    let northPattern = /(north)(?:[^\d]*)(\d{2})(?:[^,]*)(,)(?:[^\d]*)(\d{6})/gmi;
    let eastPattern = /(east)(?:[^\d]*)(\d{2})(?:[^,]*)(,)(?:[^\d]*)(\d{6})/gmi;

    let north = '';
    let east = '';
    let message = text.split(keyword)[1];

    text = text.replace(northPattern,replacer);
    text.replace(eastPattern,replacer);

    function replacer(match,gr1,gr2,gr3,gr4) {
        if (gr1.toLowerCase() === 'north'){
            north = gr2+gr3+gr4;
            return gr2+gr3+gr4;
        } else if(gr1.toLowerCase() === 'east'){
            east = gr2+gr3+gr4;
            return gr2+gr3+gr4;
        }
    }

    console.log(north.replace(',','.') + ' N');
    console.log(east.replace(',','.') + ' E');
    console.log('Message: '+message);
}

solve('encrKey/',
'east eastnorth east29north 43,456789\nnorth one east 40,000000 encrKey/To live is the rarest thing in the world. Most people exist, that is allencrKey/'
);
