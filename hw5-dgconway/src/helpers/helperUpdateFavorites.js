const addAFav = (newFav, favorites, setFavorites) => {
    setFavorites([...favorites, newFav])
}

const removeAFav = (oldFav, favorites, setFavorites) => {
    const index = favorites.indexOf(oldFav)
    const firstPart = favorites.slice(0, index)
    const secondPart = favorites.slice(index+1, favorites.length)
    setFavorites([...firstPart, ...secondPart])
}

function toggleFav(clickedFav, favorites, setFavorites) {
    if (favorites.includes(clickedFav)) {
        removeAFav(clickedFav, favorites, setFavorites)
    } else {
        addAFav(clickedFav, favorites, setFavorites)
    }
}

export default toggleFav;