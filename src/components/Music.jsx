import React from 'react'

function Music(props) {
    console.log("Music props")
    console.log(props)
 return (
    <div className="music">
            <div className="displayContent">
            {props.data.map((item, index) => (
                <li key={index}>
                    <p>{item.type} : {item.name} </p>
                </li>
            ))}
        </div>
    </div>
    )
}

export default Music
