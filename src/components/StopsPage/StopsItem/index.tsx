import React from "react";
import { styles as s} from "./styles";
import {Text, TouchableHighlight, View} from "react-native";
import {IconAntd} from "../../../icons";
import Colors from "../../../styles/Colors";
import {useDispatch} from "react-redux";
import {Dispatch} from "../../../store";
import {useNavigation} from "@react-navigation/native";

type TStop = {
    id: string,
    index: number,
    name: string
}

const StopsItem = ({id, index, name}: TStop) => {
    const dispatch = useDispatch<Dispatch>();
    const navigation = useNavigation();

    const onPressSelectStop = (id: string, name: string) => {
        dispatch.bus_stops.SET_SELECTED_STOP({id, name});
        navigation && navigation.navigate("MainPage" as never);
    }

    return (
        <TouchableHighlight onPress={() => onPressSelectStop(id, name)} underlayColor={Colors.TouchableRed} activeOpacity={0.8}>
            <View style={s.StopsItem}>
                <Text style={s.StopsItem_Text}>{name}</Text>
                <IconAntd title={"right"} color={s.iconStyle.color} size={s.iconStyle.width}/>
            </View>
        </TouchableHighlight>
    )
}

export default React.memo(StopsItem);
