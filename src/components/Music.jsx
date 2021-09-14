import React, {useEffect} from 'react'

function Music(props) {   
    console.log({props})

    useEffect(async () => {
     
      let result = await fetch(" https://yt-music-api.herokuapp.com/api/yt/artists/metallica")
      let data = await result.json()
      console.log(data)
    },[])

    return (
        <div>
            <ul>
                <li>
                    <p>Artist {props.content}</p>
                </li>
            </ul>
        </div>
    )
}

export default Music
