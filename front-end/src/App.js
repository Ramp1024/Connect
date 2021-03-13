import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import SignUp from "./SignUp"


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;