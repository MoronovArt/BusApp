import React from "react";
import { styles as s} from './styles';
import {Keyboard, SafeAreaView, TouchableWithoutFeedback, View} from "react-native";
import {SearchInput, StackHeader, CitiesList} from "../../components";


const CitiesPage = () => {

    return (
        <SafeAreaView style={s.CitiesPage_Container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={s.CitiesPage}>
                    <StackHeader title={"Города"}/>
                    <SearchInput type={"cities"}/>
                    <CitiesList/>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default CitiesPage;
