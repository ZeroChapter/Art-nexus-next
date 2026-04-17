import React from "react"
import './DevelopmentPage.css'

export const DevelopmentPage = () => {

    return (
        <div className="dev-backbround">
            <div className="flex-container">
            <h1 className="Dev-Logo">ART NEXUS</h1>
            <h2 className="Dev-h2">Сайт в разработке, скоро появится!</h2>
            <div className="iconses">
                <a href="https://www.instagram.com/artnexus.clothing/" target="_blank"><img src="/icons/inst.svg" className="icon-container" alt=""/></a>
                <a href="https://t.me/ArtNexusCloth" target="_blank"><img src="/icons/tg.svg" className="icon-container" alt="" /></a>
            </div>
            </div>
        </div>
    )
}