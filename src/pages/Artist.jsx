import React, {useEffect, useState} from 'react'

function Artist(props) {
    const {id} = props.match.params; // hämtar ut ID på artist från SearchResult/Card.
    const [result, setResult] = useState(null)

    // UseEffect som hämtar informationen från API:et baserat på ID och visa det i komponenten
    useEffect(async () => {
        let result = await fetch("https://yt-music-api.herokuapp.com/api/yt/artist/" + id)
        const data = await result.json();
    
        setResult(data)
    },[])

    const linkSoung = () => {
        // Hämtar länken för en artist
        const copyText = "http://localhost:3000/artist/"+ id

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText);

        /* Alert the copied text */
        alert("Copied the text: " + copyText);
    }
    
    if (result === null) return <div>Loading...</div>
    if (result.error) return <div>Error: {result.error}</div>
  
    return (
        <div>
            <div>
               <p className="artist-band">Band: {result.name}</p>
               <p className="artist-description">Description: {result.description}</p>
               <p>Total viws: {result.views}</p>
               <button className="artist-share-link" onClick={() => linkSoung()}>Share link</button>
            </div>
       
        </div>
    )
}

export default Artist
