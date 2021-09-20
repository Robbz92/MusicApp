import React, {useEffect} from 'react'

function Album(props) {

    // hämtar ut browseId
    const { id } = props.match.params

    /**
     * Skapar en fetch för https://yt-music-api.herokuapp.com/api/yt/search/
     * Detta är den generalla endpointen. Finns ingen för Albums.
     * Skapar en UseEffect för att fetcha data vid inladdning.
     * 
     * [heads up] -> Det finns ingen endpoint så datan här kommer vara likadan som i generella sökningen...Hur gör jag här(?)
     * 
     */

    useEffect(async () => {
        let result = await fetch("https://yt-music-api.herokuapp.com/api/yt/artist/"+ id)
        const data = await result.json()
        console.log(data)
    },[])


    // jag vill kunna dela album på en länk
    const linkSoung = () => {

        const copyText = "http://localhost:3000"+ props.location.pathname
        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText);

        /* Alert the copied text */
        alert("Copied the text: " + copyText);
    }
    return (
        <div>
             <h1>API:et saknar enpoint för albums. Jag kan inte printa ut låtar per album.</h1>
             <button className="album-share-link" onClick={() => linkSoung()}>Share link</button>
        </div>
    )
}

export default Album
