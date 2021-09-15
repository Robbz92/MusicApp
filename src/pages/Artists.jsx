import React from 'react'

export default function Artists({data}) {
    console.log(data)
    return (
        <div>
            {data.map((item, index) =>{
                <li key={index}>
                    <p>{item.type}</p>
                </li>
            })}
        </div>
    )
}
