import React from 'react';
import classes from './Navigation.css';

const navigation = (props) => (
    <div className={classes.Navigation}>{props.children}</div>
);

export default navigation;