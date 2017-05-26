function composeTag(data) {
    let[location,text] = [data[0],data[1]];

    console.log(`<img src="${location}" alt="${text}">`)
}