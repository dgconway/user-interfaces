import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import Song from './Song';
import toggleFav from "../helpers/helperUpdateFavorites";
import summarizeSongs from "../helpers/helperComputeAgg";

const AllSongs = (props) => {

    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);

    const [allSongs, setAllSongs] = useState([]);

    useEffect(() => {
        fetch('https://cs571.org/s23/hw5/api/songs', {method: "GET", headers: {"X-CS571-ID": "bid_4c2e0a660c7168a42f85"}})
        .then(res => res.json())
        .then(songs => {
            setAllSongs(songs);
        })
    }, []);

    return <div>
        <h1>Songs</h1>
        <p>{summarizeSongs(allSongs)}</p>
        <Container fluid>
            <Row>
        {allSongs.map(song => 
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
        </Row>
        </Container>
    </div>
}

export default AllSongs;