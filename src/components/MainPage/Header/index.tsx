import React, {useCallback} from "react";
import {styles as s} from './styles';
import {View, Text, TouchableOpacity, Image} from "react-native";
// @ts-ignore
import BusHeaderIcon from '../../../assets/bus_header.png';
// @ts-ignore
import QrHeaderIcon from "../../../assets/qr_header.png";
import {IconAntd} from "../../../icons";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

const MainPageHeader = () => {

    const city = useSelector((state: RootState) => state.cities?.selectedCity.name);

    return (
        <View style={s.Header}>
            <View style={s.Header_IconContainer}>
                <Image source={BusHeaderIcon}/>
            </View>
            <View style={s.Header_TextContainer}>
                <Text style={s.Header_CityText} numberOfLines={1} ellipsizeMode={"tail"}>{`Город ${city}`}</Text>
                <Text style={s.Header_Text} numberOfLines={1} ellipsizeMode={"tail"}>Прогноз прибытия транспорта</Text>
            </View>
        </View>
    )
}

export default MainPageHeader;
