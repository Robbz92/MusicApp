import React from 'react'

function Album(props) {
  // sökväg: /album/:id/ => props.params.id
  // Useeffect som hämtar data baserat på ID:t i sökvägen (/album/:id)
  // När den hämtat data, skriv till statet

  // if (state === null) return <div>Loading...</div>
  return (
    <div className="displayAlbum">
      {props.data.map((item, index) => (
        <li key={index}>
          <div className="cont">
            <img src={item.thumbnails[0].url} />
            <p>{item.type} : {item.name}</p>
            <p>Artis : {item.artist}</p>
            <p>År : {item.year}</p>
          </div>
          <br></br>
        </li>
      ))}
    </div>
  )
}

export default Album
