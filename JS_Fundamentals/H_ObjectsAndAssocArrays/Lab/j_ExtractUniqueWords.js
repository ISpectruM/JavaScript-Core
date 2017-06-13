function extractUniqueWords(arrStr) {
    let text = arrStr.join('\n');
    let words = text.split(/\W+/).filter(w => w !== '').map(w => w.toLowerCase());

    let unique = new Set();
    for (let word of words) {
        unique.add(word);
    }

    console.log(Array.from(unique).join(', '));
}
extractUniqueWords([
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis hendrerit dui.',
   'Quisque fringilla est urna, vitae efficitur urna vestibulum fringilla.',
   'Vestibulum dolor diam, dignissim quis varius non, fermentum non felis.',
   'Vestibulum ultrices ex massa, sit amet faucibus nunc aliquam ut.',
   'Morbi in ipsum varius, pharetra diam vel, mattis arcu.',
   'Integer ac turpis commodo, varius nulla sed, elementum lectus.',
   'Vivamus turpis dui, malesuada ac turpis dapibus, congue egestas metus.'

]);