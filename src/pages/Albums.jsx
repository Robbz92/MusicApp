import React from 'react'

export default function Albums({data}) {
    console.log(data)
  return (
    <div>
      {data.map((item, index) => {
        <li key={index}>
          <p>{item.name}</p>
        </li>
      })}
    </div>
  )
}
