import React, { useEffect, useState } from 'react'

function Music(props) {
    const [songName, setSongName] = useState([])
    console.log(props.inputText)
    
    // we will use async/await to fetch this data
    async function getData() {
        if (props.inputText != null){
            console.log(props.inputText.value)
            let result = await fetch(" https://yt-music-api.herokuapp.com/api/yt/artists/"+ props.inputText.value )
            const data = await result.json();
            const { content } = data

            // store the data into our books variable
            setSongName(content);
            console.log(songName)
        }
    }

    return (
        <div>
            <button onClick={getData}>Press me</button>
            <div className="display">
                {songName.map((item, index) => (
                    <li key={index}><p>{item.name}</p></li>
                ))}
            </div>
        </div>
    )
}

export default Music
