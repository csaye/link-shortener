import React, { useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';

import './App.css';

import { firebaseConfig } from '../../util/firebaseConfig.js';

firebase.initializeApp(firebaseConfig);

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  async function shortenLink(e) {
    e.preventDefault();
  }

  return (
    <div className="App">
      <div className="center-box">
        <form onSubmit={shortenLink}>
          <input
            value={longUrl}
            onChange={e => setLongUrl(e.target.value)}
            required
          />
          <button type="submit">Shorten Link</button>
        </form>
        {shortUrl && <a href={shortUrl} rel="noreferrer"><p>{shortUrl}</p></a>}
      </div>
    </div>
  );
}

export default App;
