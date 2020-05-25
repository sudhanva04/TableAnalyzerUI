import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import AnalyserReducer from './reducers/AnalyserReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(AnalyserReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>,
    document.getElementById('root'));