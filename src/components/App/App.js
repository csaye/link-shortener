import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from '../../util/firebaseConfig.js';

import CreateLink from '../CreateLink/CreateLink.js';

import './App.css';

firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <CreateLink />
    </div>
  );
}

export default App;
