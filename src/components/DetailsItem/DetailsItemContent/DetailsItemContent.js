import React from 'react';
import classes from './DetailsItemContent.css';

import DetailsItemImage from './DetailsItemImage/DetailsItemImage';
import DetailsItemInfo from './DetailsItemInfo/DetailsItemInfo';

const detailsItemContent = (props) => (
    <div className={classes.DetailsItemContent}>
        <DetailsItemImage img={props.Poster}/>
        <DetailsItemInfo {...props} episodeClicked={(i) => props.clicked(i)}/>
    </div>
);

export default detailsItemContent;