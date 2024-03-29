import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import moviesReducer from './containers/Home/store/reducers/movies';
import detailsReducer from './containers/Details/store/reducers/details';
import episodesReducer from './containers/Episodes/store/reducers/episodes';
import statsReducer from './containers/Stats/StatsType/store/reducers/statsType';

const rootReducers = combineReducers({
    movies: moviesReducer,
    details: detailsReducer,
    episodes: episodesReducer,
    stats: statsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <BrowserRouter>
        <Provider store={store} ><HashRouter><App/></HashRouter></Provider>
    </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
