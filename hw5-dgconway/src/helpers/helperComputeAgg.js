function summarizeSongs(allSongs, favoritesPage) {
    // adapted from https://codeburst.io/javascript-array-distinct-5edc93501dc4
    let genres=[]
    let minutes = []
    let seconds = []
    for (let i=0; i<allSongs.length; i++) {
        genres.push(allSongs[i].genre)
        let splitTime = allSongs[i].length.split(":")
        minutes.push(splitTime[0])
        seconds.push(splitTime[1])
    }

    const distinctGenres = [...new Set(genres)]
    const numbGenres = distinctGenres.length

    // adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    const totalMinutes = minutes.reduce((prevVal, curVal) => prevVal+parseInt(curVal), 0)
    const totalSeconds = seconds.reduce((prevVal, curVal) => {
        return prevVal+parseInt(curVal)}, 0)

    return `${favoritesPage ? "You have favorited" : "We have"} ${allSongs.length} songs in ${numbGenres} genres for a total of ${totalMinutes*60 + totalSeconds} seconds of music!`
}

export default summarizeSongs;