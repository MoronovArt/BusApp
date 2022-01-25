import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StopsPage, MainPage, SettingsPage, QrPage, CitiesPage, CitiesSelectorPage} from "../screens";
import {useSelector} from "react-redux";
import {RootState} from "../store";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    const selectedCity = useSelector((state: RootState) => state.cities?.selectedCity.id);

    return (
        <Stack.Navigator>
            {!selectedCity && <Stack.Screen name={"CitiesSelectorPage"} options={{headerShown: false, animation: "fade"}} component={CitiesSelectorPage}/>}
            <Stack.Screen name={"MainPage"} options={{headerShown: false, animation: "fade"}} component={MainPage}/>
            <Stack.Screen name={"StopsPage"} options={{headerShown: false, animation: "fade"}} component={StopsPage}/>
            <Stack.Screen name={"SettingsPage"} options={{headerShown: false, animation: "fade"}} component={SettingsPage}/>
            <Stack.Screen name={"QrPage"} options={{headerShown: false, animation: "fade"}} component={QrPage}/>
            <Stack.Screen name={"CitiesPage"} options={{headerShown: false, animation: "fade" }} component={CitiesPage}/>
        </Stack.Navigator>
    );
}

export default AppNavigation;
