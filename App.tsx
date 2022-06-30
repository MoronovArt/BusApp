import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from "react-native-bootsplash";
import AppNavigation from "./src/navigation/AppNavigation";
import {Provider} from "react-redux";
import store from "./src/store";
import YaMap from "react-native-yamap";

YaMap.init('39b005e4-a61b-4d0b-85f4-e6b6213fb497');
YaMap.setLocale('ru_RU');
YaMap.resetLocale();

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
