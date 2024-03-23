import {View, Text} from 'react-native';
import React from 'react';
import Navigator from './Navigator';
import {DataProvider} from './src/context/DataContext';

const App = () => {
  return (
    <DataProvider>
      <Navigator />
    </DataProvider>
  );
};

export default App;
