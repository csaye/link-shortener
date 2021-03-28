import React, { useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';

import './App.css';

import { firebaseConfig } from '../../util/firebaseConfig.js';

const urlRegex = /^([A-Za-z0-9-:/.]+)$/;
const pathRegex = /^([A-Za-z0-9-_]+)$/;

firebase.initializeApp(firebaseConfig);

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [path, setPath] = useState('');
  const [error, setError] = useState('');

  const pathsRef = firebase.firestore().collection('paths');

  async function shortenLink(e) {
    e.preventDefault();
    setError('');
    const linkPath = path;
    // if long url invalid, return
    if (!urlRegex.test(longUrl)) {
      setError('Invalid long link.');
      return;
    }
    // if path invalid, return
    if (!pathRegex.test(linkPath)) {
      setError('Path can only contain letters, numbers, underscores, and dashes.');
      return;
    }
    // if path already exists, return
    const pathDoc = await pathsRef.doc(linkPath).get();
    if (pathDoc.exists) {
      setError('Path already exists.');
      return;
    }
    // update firebase with redirect
    await pathsRef.doc(linkPath).set({
      redirect: longUrl
    });
    setShortUrl('/' + linkPath);
  }

  return (
    <div className="App">
      <div className="center-box">
        <form onSubmit={shortenLink}>
          <label htmlFor="input-longurl">Long Link</label>
          <input
            id="input-longurl"
            value={longUrl}
            onChange={e => setLongUrl(e.target.value)}
            required
          />
          <label htmlFor="input-path">Path</label>
          <input
            id="input-path"
            value={path}
            onChange={e => setPath(e.target.value)}
            required
          />
          <button type="submit">Shorten Link</button>
        </form>
        {shortUrl && <a href={shortUrl} rel="noreferrer"><p>{shortUrl}</p></a>}
        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
}

export default App;
