import React from 'react'
import { Link } from "react-router-dom"

function Card(props) {
    const { imgUrl, title, subtitle, url, id } = props;

    return (
        <Link to={url}>
            <div key={id}>
                <img src={imgUrl} />
                <p>{title}</p>
                <p>{subtitle}</p>
            </div>
        </Link>
    )
}

export default Card