import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history'
import store from './store/configureStore'

import App from "./App";

const browserHistory = createBrowserHistory();

ReactDOM.render(
    <Provider store={store(browserHistory)}>
        <App/>
    </Provider>, document.getElementById("root"));
