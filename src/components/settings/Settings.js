import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../firebase';

const Settings = () => {
  const [apiKey, setApiKey] = useState('');

  const storeApiKey = async () => {
    const userId = auth.currentUser.uid;
    try {
      await axios.post(process.env.REACT_APP_FIREBASE_CLOUD_FUNCTION_URL + '/storeApiKey', { userId, apiKey });
      alert('API Key saved successfully.');
    } catch (error) {
      console.error('Error storing API Key:', error);
      alert('Failed to save API Key.');
    }
  };

  const getApiKey = async () => {
    const userId = auth.currentUser.uid;
    try {
      const response = await axios.get(process.env.REACT_APP_FIREBASE_CLOUD_FUNCTION_URL + '/getApiKey', { params: { userId } });
      setApiKey(response.data.apiKey);
    } catch (error) {
      if (error.response.status !== 404) {
        console.error('Error retrieving API Key:', error);
        alert('Failed to retrieve API Key.');
      } else {
        console.log('API Key not found');
      }
    }
  };

  useEffect(() => {
    getApiKey();
  }, []);

  return (
    <div className="settings">
      <h1>Settings</h1>
      <label htmlFor="apiKey">API Key:</label>
      <input
        type="text"
        id="apiKey"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Enter your API Key"
      />
      <button onClick={storeApiKey}>Save API Key</button>
    </div>
  );
};

export default Settings;