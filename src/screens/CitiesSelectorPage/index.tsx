import React from "react";
import {Image, SafeAreaView, Text, View} from "react-native";
import {CitiesList, SearchInput} from "../../components";
import { styles as s} from "./styles";
// @ts-ignore
import Logo from "./../../assets/bootsplash_logo_original.png";

const CitiesSelectorPage = () => {
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={s.CitiesSelectorPage_Header}>
                <Image source={Logo} style={s.CitiesSelectorPage_Logo}/>
                <Text style={s.CitiesSelectorPage_Title}>{"Выберите город из списка"}</Text>
            </View>
            <SearchInput type={"cities"}/>
            <CitiesList/>
        </SafeAreaView>
    )
}

export default CitiesSelectorPage;
