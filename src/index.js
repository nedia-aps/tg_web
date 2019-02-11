import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import configureAxios from "./utils/axiosDefault";
import ReduxThunk from "redux-thunk";
import combineReducers from "./redux/reducers";
import BrowserRouter from "./BrowserRouter";
import ReduxToastr from "react-redux-toastr";
const history = createBrowserHistory();
//let store = createStore(todoApp)

configureAxios();
const appStore = createStore(combineReducers, {}, applyMiddleware(ReduxThunk));
ReactDOM.render(
  <Provider store={appStore}>
    <div>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="bottom-center"
        transitionIn="bounceIn"
        transitionOut="bounceOut"
      />

      <HashRouter history={history}>
        <BrowserRouter />
      </HashRouter>
    </div>
  </Provider>,
  document.getElementById("root")
);
