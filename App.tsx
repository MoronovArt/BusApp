import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from "react-native-bootsplash";
import AppNavigation from "./src/navigation/AppNavigation";
import {Provider} from "react-redux";
import store from "./src/store";

const App = () => {

    return (
        <Provider store={store}>
            <NavigationContainer onReady={() => RNBootSplash.hide({fade: true})}>
                <AppNavigation/>
            </NavigationContainer>
        </Provider>
    );

};

export default App;
