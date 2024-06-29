import React from 'react'
import './lockScreen.scss'

export default function lockScreen({size, text = "loading"}) {
    return (
        <div className='lockScreen'>
            <div className="container">
                <div className="loader" style={{width:size*10+"px",height:size*10+"px"}}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="loading">
                    <span className="loader-text" style={{fontSize:size*2.2+"px"}}>{text}</span>
                </div>
            </div>
        </div>
    )
}
