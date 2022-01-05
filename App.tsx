import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RNBootSplash from "react-native-bootsplash";
import AppNavigation from "./src/navigation/AppNavigation";

const App = () => {

  return (
      <NavigationContainer onReady={() => RNBootSplash.hide({fade: true})}>
        <AppNavigation/>
      </NavigationContainer>
  );

};

export default App;
