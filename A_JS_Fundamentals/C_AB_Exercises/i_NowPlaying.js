function displayPlayingSong(data) {
    let song = data[0];
    let artist = data[1];
    let duration = data[2];

    console.log(`Now Playing: ${artist} - ${song} [${duration}]`)
}