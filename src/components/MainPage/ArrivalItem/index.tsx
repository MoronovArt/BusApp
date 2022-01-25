import React from "react";
import { styles as s} from './styles';
import {Image, Text, View} from "react-native";
// @ts-ignore
import BusIcon from "../../../assets/bus.png";
import {TForecast} from "../../../api/Api";


const ArrivalItem = ({distance_to_stoppoint, rem_minutes, route_name, stoppoint_name, forecast_time_arrival, route_description}: TForecast) => {
    return (
        <View style={s.ArrivalItem}>
            <View style={[s.ArrivalItem_Icon, s.ArrivalItem_Column, s.Padding_5]}>
                <Image source={BusIcon} style={s.ArrivalItem_IconStyle}/>
                <Text style={[s.ArrivalItem_Text, s.ArrivalItem_TextWhite]}>{route_name}</Text>
            </View>
            <View style={[s.ArrivalItem_Column, s.Padding_5]}>
                <Text style={[s.ArrivalItem_Text, {textAlign: "center"}]}>{rem_minutes}</Text>
            </View>
            <View style={s.ArrivalItem_Column}>
                <Text style={s.ArrivalItem_Text}>{forecast_time_arrival}</Text>
            </View>
            <View style={[{flex:1}, s.Padding_8]}>
                <Text style={s.ArrivalItem_NameText} ellipsizeMode={"tail"} numberOfLines={2}>{route_description}</Text>
            </View>
            <View style={s.ArrivalItem_Column}>
                <Text style={s.ArrivalItem_Text}>{distance_to_stoppoint}</Text>
                <Text style={s.ArrivalItem_Text}>{"км"}</Text>
            </View>

        </View>
    )
}

export default React.memo(ArrivalItem);
