import React, { Component } from 'react';
import classes from './Layout.css';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Navigation from '../../components/Navigation/Navigation';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';

class Layout extends Component {
    render() {
        return (
            <Aux>
                <Navigation><NavigationItems/></Navigation>
                <main className={classes.Layout}>{this.props.children}</main>
            </Aux>
        )
    }
}

export default Layout;