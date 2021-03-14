import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import SignUp from "./Components/SignUp.js";
import Verify from "./Components/Verify";
import Home from "./Components/Home";
import Form from "./Components/Form";

import Login from "./Components/Login";
import Preferences from "./Components/Preferences.js";
function App() {

  // useEffect(() => {
  //   document.title = "Connect";
  // }, []);

  return (
    <div className="App">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
      </style>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/verify" exact>
            <Verify />
          </Route>{" "}
          <Route path="/home" exact>
            <Home />
          </Route>{" "}
          <Route path="/form" exact>
            <Form />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/pref" exact>
            <Preferences />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;