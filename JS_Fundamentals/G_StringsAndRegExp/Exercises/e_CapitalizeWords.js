function capitalize(string) {
    let words = `${string}`.split(' ');
    console.log(words.map(
        w => w[0].toUpperCase() + w.slice(1).toLowerCase())
        .join(" "));
}
capitalize('Was that Easy? tRY thIs onE for SiZe!');
