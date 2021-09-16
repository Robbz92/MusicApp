import React, {useEffect} from 'react'

function Artist(props) {
    useEffect(() => {
        const id = props.match.id;
        console.log(id)
    })
    // UseEffect som hämtar informationen från API:et baserat på ID och visa det i komponenten

    return (
        <div>
           <h1>HEllo from artist</h1>
        </div>
    )
}

export default Artist
