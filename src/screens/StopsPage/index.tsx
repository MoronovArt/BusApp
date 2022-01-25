import React from "react";
import { styles as s} from './styles';
import {Keyboard, SafeAreaView, TouchableWithoutFeedback, View} from "react-native";
import {SearchInput, StackHeader, StopsList} from "../../components";

const StopsPage = () => {

    return (
        <SafeAreaView style={s.StopsPage_Container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={s.StopsPage}>
                    <StackHeader title={"Остановки"}/>
                    <SearchInput type={"stops"}/>
                    <StopsList/>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default StopsPage;
