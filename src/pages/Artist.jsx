import React from 'react'

function Artist(props) {
    console.log(props)

    return (
        <div className="displayArtist">
             {props.data.map((item, index) => (
                <li key={index}>
                    <div className="cont">
                        <img src={item.thumbnails[0].url}/>
                        <p>{item.type} : {item.name} </p>
                    </div>
                    
                    <br></br>
                </li>
             ))} 
        </div>
    )
}

export default Artist