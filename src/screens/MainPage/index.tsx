import React from "react";
import { styles as s} from './styles';
import {SafeAreaView} from "react-native";
import {ArrivalList, CityInfo, MainPageHeader, StopsSearcher} from "../../components";
import {View} from "react-native";


const MainPage = () => {
    return (
        <SafeAreaView style={s.MainPage}>
            <View style={s.MainPage_Content}>
                <MainPageHeader/>
                <StopsSearcher/>
                <ArrivalList/>
            </View>
            <CityInfo/>
        </SafeAreaView>
    )
}

export default MainPage;
