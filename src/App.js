import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { setAuthToken } from "./utils/setAuthToken";
import { USER_LOGIN_FAIL } from "./redux/actions/types";
import { loadUserData } from "./redux/actions/user";
import Navbar from "./components/navbar/Navbar";
import Routes from "./routing/Routes";

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.usertoken) {
      setAuthToken(localStorage.usertoken);
      store.dispatch(loadUserData());
    }
    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.admintoken) store.dispatch({ type: USER_LOGIN_FAIL });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
