function split(text,delimiter) {
    text.split(`${delimiter}`).forEach(s => console.log(s));
}
split('One-Two-Three-Four-Five','-');
split('http://platform.softuni.bg','.');