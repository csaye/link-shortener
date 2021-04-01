import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from '../../util/firebaseConfig.js';

import CreateLink from '../CreateLink/CreateLink.js';
import Redirect from '../Redirect/Redirect.js';

import './App.css';

firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/:path">
            <Redirect />
          </Route>
          <Route path="/">
            <CreateLink />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
