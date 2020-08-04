/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import 'moment-timezone';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import storage from './src/config/redux/store';
import Routes from './src/routes/index';

import FlashMessage from 'react-native-flash-message';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const {store, persistor} = storage;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  );
};

export default App;
