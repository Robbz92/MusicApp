import React from 'react'

function Artist(props) {
    console.log(props)

    return (
        <div className="displayArtist">
             {props.data.map((item, index) => (
                <li key={index}>
                    <p>{item.type} : {item.name} </p>
                    <img src={item.thumbnails[0].url}/>
                </li>
             ))} 
        </div>
    )
}

export default Artist