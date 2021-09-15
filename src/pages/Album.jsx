import React, {useState} from 'react'

function Album(props) {
  const [variable, setVariable] = useState('default')

  console.log(props)
  // sökväg: /album/:id/ => props.params.id
  // Useeffect som hämtar data baserat på ID:t i sökvägen (/album/:id)
  // När den hämtat data, skriv till statet

  // if (state === null) return <div>Loading...</div>
  return (
    <div>
      
    </div>
  )
}

export default Album
