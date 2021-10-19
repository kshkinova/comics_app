import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Comic from './components/Comic';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/:id" component={Comic}/>
          <Route path="/" render={(props) => <Comic {...props}/> }/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
