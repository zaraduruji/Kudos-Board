import "./Card.css"

function Card(props) {
    return(
        <div className="card">
            <p>Text Message</p>
            <img src={props.image} alt=""/>
            <p>Card Author</p>
            <div className="card-buttons">
                <button>Upvote</button>
                <button>Delete Card</button>
            </div>
        </div>
    )
}

export default Card;
