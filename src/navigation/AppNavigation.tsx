import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BusPage, MainPage} from "../screens";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"MainPage"} options={{headerShown: false}} component={MainPage}/>
            {/*<Stack.Screen name={"StopsPage"} options={{headerShown: false}} component={BusPage}/>*/}
        </Stack.Navigator>
    );
}

export default AppNavigation;
