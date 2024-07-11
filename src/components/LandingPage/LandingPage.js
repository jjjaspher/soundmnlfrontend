import React from 'react';
import classes from './LandingPage.module.scss';
import soundwave from '../../assets/images/soundwave.gif'

const page = (props) => {
    return (
        <div className={classes.LandingPageContainer}>
            <div className={classes.BgImg}></div>
            <img src={soundwave} className={classes.soundwave1} alt="#"/>
            <img src={soundwave} className={classes.soundwave2} alt="#"/>
            <div className={classes.TitleCont}>
                <h1 className={classes.Title}>Sound<span className={classes.SpanTitle}>MNL</span> Studio</h1>
            </div>            
        </div>
    );
}

export default page;