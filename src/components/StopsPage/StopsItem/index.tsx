import React, {useMemo} from "react";
import { styles as s} from "./styles";
import {Image, Text, TouchableHighlight, View} from "react-native";
import {IconAntd} from "../../../icons";
import Colors from "../../../styles/Colors";
import {useDispatch} from "react-redux";
import {Dispatch} from "../../../store";
import {useNavigation} from "@react-navigation/native";
import {TStop} from "../../../api/Api";
// @ts-ignore
import BusIcon from "../../../assets/bus.png";
// @ts-ignore
import TramIcon from "../../../assets/tram.png";
// @ts-ignore
import TrolleyIcon from "../../../assets/troll.png";



const StopsItem = ({id, index, name, transport_type}: TStop) => {
    const dispatch = useDispatch<Dispatch>();
    const navigation = useNavigation();

    const onPressSelectStop = (id: string, name: string, transport_type: string) => {
        dispatch.bus_stops.SET_SELECTED_STOP({id, name, transport_type});
        navigation && navigation.navigate("MainPage" as never);
    }

    const IconSource = useMemo(() => (transport_type === "АВТОБУС" ? BusIcon : (transport_type === "ТРАМВАЙ" ? TramIcon : TrolleyIcon)), [transport_type]);
    const IconStyle = useMemo(() => (transport_type === "АВТОБУС" ? s.StopsItem_IconStyleBlue : (transport_type === "ТРАМВАЙ" ? s.StopsItem_IconStyleRed : s.StopsItem_IconStyleGreen)), [transport_type]);

    return (
        <TouchableHighlight onPress={() => onPressSelectStop(id, name, transport_type)} underlayColor={Colors.TouchableRed} activeOpacity={0.8}>
            <View style={s.StopsItem}>
                <View style={[s.StopsItem_IconContainerStyle, IconStyle]}>
                    <Image source={IconSource} style={[s.StopsItem_IconStyle]}/>
                </View>
                <Text style={s.StopsItem_Text}>{name}</Text>
                <IconAntd title={"right"} color={s.iconStyle.color} size={s.iconStyle.width}/>
            </View>
        </TouchableHighlight>
    )
}

export default React.memo(StopsItem);
