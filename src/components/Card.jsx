import React from 'react'
import { Link } from "react-router-dom"

function Card(props) {
    const { imgUrl, title, subtitle, url, id, year, type } = props;
    // <Link == a tag.
    return (
        <Link to={url} className="card-link">
            <div key={id}>
                <img src={imgUrl} className="card-img"/>
                <p className="card-title">{title}</p>
                <p className="card-subtitle">{subtitle}</p>
                <p className="card-year">{year}</p>
                <p className="card-type">{type}</p>
                <br></br>
            </div>
        </Link>
    )
}

export default Card