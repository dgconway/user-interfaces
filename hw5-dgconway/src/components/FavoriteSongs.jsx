import { useContext } from "react";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import Song from "./Song";
import { Col } from "react-bootstrap";
import toggleFav from "../helpers/helperUpdateFavorites";
import summarizeSongs from "../helpers/helperComputeAgg";

const FavoriteSongs = (props) => {

    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);

    return <div>
        <h1>Favorites</h1>
        <p>{summarizeSongs(favorites, true)}</p>
        {favorites.map(song => 
                <Col xs={12} sm={6} md={4} lg={3} xl={2} key={song.id}>
                <Song 
                song={song}
                favorite={favorites.includes(song)}
                toggleFav={(e) => toggleFav(e, favorites, setFavorites)}
                title={song.title}
                artist={song.artist}
                img={song.img}
                length={song.length}
                year={song.year}
                genre={song.genre}
                />
                </Col>
        )}
    </div>
}

export default FavoriteSongs;