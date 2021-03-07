import React from 'react'

const Card = ({image, face, onclick, index}) => {
    return (
        <div className={face ? 'card-container clicked': 'card-container'}  onClick={() => onclick(index)}>
            <div className="card">
                <div className="front">
                </div>
                <div className="back">
                    <img src={image} alt ="card"/>
                </div>
            </div>
        </div>
    )
}

export default Card
