import { Card, Button } from "react-bootstrap";
import './Song.css';

const Song = (props) => {
    return <Card className="songCard">
        <img src={props.img} alt={props.title}/>
        <p><strong>{props.title}</strong></p>
        <p>By: {props.artist}</p>
        <p>{props.length} | {props.year} | {props.genre}</p>
        <Button variant={props.favorite ? "danger" : "primary"} onClick={() => props.toggleFav(props.song)}>{props.favorite && "Remove from favorites"} {!props.favorite && "Add to favorites"}</Button>
    </Card>
}

export default Song;