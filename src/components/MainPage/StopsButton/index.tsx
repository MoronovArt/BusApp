import {Text, TouchableOpacity, View} from "react-native";
import React, {useCallback} from "react";
import {styles as s} from "./styles";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

const StopsButton = () => {
    const stopName = useSelector((state:RootState) => state.bus_stops?.selectedStop.name);

    const navigation = useNavigation();

    const onSearchPress = useCallback(() => {
        navigation && navigation.navigate('StopsPage' as never);
    }, [])

    return (
        <View style={s.StopsButton_Container}>
            <TouchableOpacity onPress={onSearchPress}>
                <View style={s.StopsButton}>
                    <Text style={s.StopsButton_Text}>{stopName? "Сменить остановку" : "Выбрать остановку"}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default StopsButton;
