import React from 'react'
import '../styles/popularHouses.css'
import { faBed, faCheck, faCross, faDollarSign, faToilet, faTree } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const PopularHouse = (props) =>{

    return (
        <>
        <div className="house">
            <img src={props.house.photo}></img>
            <div className="details">
                <p><FontAwesomeIcon icon={faToilet} /> {props.house.bathrooms}</p>
                <p><FontAwesomeIcon icon={faBed} /> {props.house.bedrooms}</p>
                <p><FontAwesomeIcon icon={faDollarSign} />{props.house.price} USD</p>
                <p>{props.house.garden ? <><FontAwesomeIcon icon={faCheck} /> <FontAwesomeIcon icon={faTree} /></>: <><FontAwesomeIcon icon={faCross} /> <FontAwesomeIcon icon={faTree} /></>}</p>
            </div>
        </div>
         </>
    )

}

export default PopularHouse