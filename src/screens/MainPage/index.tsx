import React from "react";
import { styles as s} from './styles';
import {SafeAreaView, View} from "react-native";
import {MainPageHeader, StopsSearcher} from "../../components";


const MainPage = () => {
    return (
        <SafeAreaView style={s.MainPage}>
            <MainPageHeader/>
            <StopsSearcher/>
        </SafeAreaView>
    )
}

export default MainPage;
