import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './DetailsItem.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import DetailsItemHeader from './DetailsItemHeader/DetailsItemHeader';
import DetailsItemContent from './DetailsItemContent/DetailsItemContent';
import Episodes from '../../containers/Episodes/Episodes';
import * as actionCreators from '../../containers/Details/store/actions/index';

class DetailsItem extends Component {

    render() {
        let details = <p>Loading...</p>;
        if (this.props.Title) {
            details = <Aux>
                <div className={classes.DetailsItem}>
                    <DetailsItemHeader {...this.props}/>
                    <DetailsItemContent {...this.props} clicked={(id) => this.props.onAddSeasonId(id) }/>
                </div>
                {this.props.onGetSeasonId.seasonId && this.props['seriesID'] === undefined ? <Episodes imdbId={this.props.imdbID} id={this.props.onGetSeasonId.seasonId} /> : null}
            </Aux>
        }

        return (<Aux>{details}</Aux>)
    }
}

const mapStateToProps = state => {
  return {
      onGetSeasonId: state.details
  }
};

const mapDispatchToProps = dispatch => {
  return {
      onAddSeasonId: (id) => dispatch(actionCreators.getSeasonId(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsItem);