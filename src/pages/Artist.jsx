import React, {useEffect, useState} from 'react'

function Artist(props) {
    const {id} = props.match.params; // hämtar ut ID på artist från SearchResult/Card.
    const [result, setResult] = useState(null)
    const [thumbnails, setThumbnails] = useState([])

    /**
     * UseEffect som hämtar informationen från API:et baserat på ID och visa det i komponenten
     * denna endpointen fungerar inte om man söker på en artist /api/yt/artist/browseId
     * Söker man på ett band fungerar det.
     * band id: https://yt-music-api.herokuapp.com/api/yt/artist/UC2oCil_CLZt9xh3FE73H8rg
     * artist id: https://yt-music-api.herokuapp.com/api/yt/artist/UCE2ou8xElkFc8JSOiuHoofA
     */

    useEffect(async () => {
        let result = await fetch("https://yt-music-api.herokuapp.com/api/yt/artist/" + id)
        let data = await result.json();
        setResult(data)

        setThumbnails(data.thumbnails[0].url)
        console.log(data)
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
               <img src={thumbnails}></img>
               <p className="artist-band">Band: {result.name}</p>
               <p className="artist-description">Description: {result.description}</p>
               <p>Total viws: {result.views}</p>
               <button className="artist-share-link" onClick={() => linkSoung()}>Share link</button>
            </div>
       
        </div>
    )
}

export default Artist
