import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import firebase from 'firebase/app';

function Redirect() {
  const { path } = useParams();

  const [exists, setExists] = useState(true);

  const pathsRef = firebase.firestore().collection('paths');

  async function triggerRedirect() {
    pathsRef.doc(path).get().then(doc => {
      if (doc.exists) {
        const docData = doc.data();
        let redirect = docData.redirect;
        if (!redirect.startsWith('http://') && !redirect.startsWith('https://')) {
          redirect = 'https://' + redirect;
        }
        window.location.href = redirect;
      } else {
        setExists(false);
      }
    });
  }

  useEffect(() => {
    triggerRedirect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (exists) {
    return (
      <div className="Redirect">
        <p>Redirecting...</p>
      </div>
    );
  } else {
    return (
      <div className="Redirect">
        <p>This redirect does not exist.</p>
      </div>
    );
  }
}

export default Redirect;
