import React from 'react';
import classes from './Logo.module.scss';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const logo = () => {
    return (
        <Aux>
            <div>
                <h3 className={classes.Title}>Sound<span className={classes.SpanTitle}>MNL</span> Studio</h3>
            </div>
        </Aux>
    );
}

export default logo;