import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import Home from './containers/Home/Home';
import Details from './containers/Details/Details';
import Stats from './containers/Stats/Stats';
import NoMatch from './components/NoMatch/NoMatch';

class App extends Component {
  render() {
    return (
      <div>
          <Layout>
              <Switch>
                  <Route path='/' exact component={Home}/>
                  <Route path='/details/:id' component={Details} />
                  <Route path='/stats' component={Stats}/>
                  <Route component={NoMatch}/>
              </Switch>
          </Layout>
      </div>
    );
  }
}

export default App;
