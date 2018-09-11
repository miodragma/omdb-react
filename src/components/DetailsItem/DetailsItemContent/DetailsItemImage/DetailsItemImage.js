import React from 'react';
import classes from './DetailsItemImage.css';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';

const detailsItemImage = (props) => {

  let image = props.img !== 'N/A' ? <img className={classes.DetailsItemImage} src={props.img} alt={props.img}/> : null;

    return (
        <Aux>{image}</Aux>
    )

};

export default detailsItemImage;