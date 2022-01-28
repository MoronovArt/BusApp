import React, {useMemo} from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StopsPage, MainPage, SettingsPage, QrPage, CitiesPage, CitiesSelectorPage} from "../screens";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {Platform} from "react-native";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    const selectedCity = useSelector((state: RootState) => state.cities?.selectedCity.id);
    const animation = useMemo(() => Platform.OS === "ios" ? "default" : "fade", []);
    return (
        <Stack.Navigator>
            {!selectedCity && <Stack.Screen name={"CitiesSelectorPage"} options={{headerShown: false, animation: animation}} component={CitiesSelectorPage}/>}
            <Stack.Screen name={"MainPage"} options={{headerShown: false, animation: animation}} component={MainPage}/>
            <Stack.Screen name={"StopsPage"} options={{headerShown: false, animation: animation}} component={StopsPage}/>
            <Stack.Screen name={"SettingsPage"} options={{headerShown: false, animation: animation}} component={SettingsPage}/>
            <Stack.Screen name={"QrPage"} options={{headerShown: false, animation: animation}} component={QrPage}/>
            <Stack.Screen name={"CitiesPage"} options={{headerShown: false, animation: animation }} component={CitiesPage}/>
        </Stack.Navigator>
    );
}

export default AppNavigation;
