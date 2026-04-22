import React from "react";
import './MessageStyle.css';

export const CompoundMessage = ({prop}) => {
    const {
        compound,
        care,
    } = prop
    return (
        <div className="content_block">
            <h1>Состав и уход</h1>
            <p> Ухаживайте за одеждой, чтобы продлить срок ее службы.
                Стирайте одежду только при необходимости. В результате стирки ткань постепенно изнашивается. 
            </p>
        
            <p id="big_text">
                состав <br/>
                {compound.map((item) => (<>{item} <br/></>))}
                уход
            </p>
            <div className="care_title">
                <div  className="circle">!</div>
                <h2>Руководство по уходу за одеждой</h2>
            </div>
            <ul className="care_list">
                {care.map((item, index) => (<li key={index}>{item}</li>))}
            </ul>
        </div>
    )
}