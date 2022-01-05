import React from "react";
import {styles as s} from './styles';
import {View, Text, TouchableOpacity, Image} from "react-native";
// @ts-ignore
import BusHeaderIcon from '../../../assets/bus_header.png';
// @ts-ignore
import QrHeaderIcon from "../../../assets/qr_header.png";

const MainPageHeader = () => {
    return (
        <View style={s.Header}>
            <Image source={BusHeaderIcon}/>
            <Text style={s.Header_Text}>Где Автобус?</Text>
            <TouchableOpacity>
                <Image source={QrHeaderIcon}/>
            </TouchableOpacity>
        </View>
    )
}

export default MainPageHeader;
