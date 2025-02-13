import React from 'react'
import './Card.css'
// import oip from '../../Assets/OIP.jpeg'
const Card = (props) => {
  return (
    
    <div className='event-card'>
        <img src={props.img} alt="firstimg" className='event-card-img' />
        <h1 className='event-card-title'>{props.eventName}</h1>
        <p className='event-card-para'>{props.aboutEvent}</p>
        <button className='learn-more'>Learn More</button>
    </div>
    
  )
}

export default Card