import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import AnalyserReducer from './reducers/AnalyserReducer';
import thunk from 'redux-thunk';

const store = createStore(AnalyserReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>,
    document.getElementById('root'));