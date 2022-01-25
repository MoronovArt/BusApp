import React from "react";
import { styles as s} from "./styles";
import {Text, TouchableHighlight, View} from "react-native";
import {IconAntd} from "../../../icons";
import Colors from "../../../styles/Colors";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../../store";
import {useNavigation} from "@react-navigation/native";
import {TCity} from "../../../api/Api";

const CitiesItem = ({id, index, name, account_id, rest_url, city_info}: TCity) => {
    const selectedAccount = useSelector((state: RootState) => state.cities?.selectedCity.account_id);

    const dispatch = useDispatch<Dispatch>();
    const navigation = useNavigation();

    const onPressSelectCity = (id: string, name: string, account_id: string, rest_url: string, city_info?: string) => {
        dispatch.cities.SET_SELECTED_CITY({id, name, account_id, rest_url, city_info});
        dispatch.bus_stops.SET_SELECTED_STOP({});
        if(selectedAccount) navigation.navigate("StopsPage" as never);
        else navigation && navigation.navigate("MainPage" as never);
    }

    return (
        <TouchableHighlight onPress={() => onPressSelectCity(id, name, account_id, rest_url, city_info)} underlayColor={Colors.TouchableRed} activeOpacity={0.8}>
            <View style={s.StopsItem}>
                <Text style={s.StopsItem_Text}>{name}</Text>
                <IconAntd title={"right"} color={s.iconStyle.color} size={s.iconStyle.width}/>
            </View>
        </TouchableHighlight>
    )
}

export default React.memo(CitiesItem);
