import React, {useCallback} from "react";
import {styles as s} from './styles';
import {View, Text, TouchableOpacity, Image, ActivityIndicator} from "react-native";
// @ts-ignore
import BusHeaderIcon from '../../../assets/bus_header.png';
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {PinBlock} from "../../index";
import {useNavigation} from "@react-navigation/native";
import {useLocation} from "../../../hooks";


const MainPageHeader = () => {

    const city = useSelector((state: RootState) => state.cities?.selectedCity.name);
    const navigation = useNavigation();

    const [isLoading, location, getLocation, setCurrentPosition] = useLocation();

    const onPinPress = async () => {
        await getLocation();
        navigation && navigation.navigate("StopsPage" as never);
    }

    return (
        <View style={s.Header}>
            <View style={s.Header_IconContainer}>
                <Image source={BusHeaderIcon}/>
            </View>
            <View style={s.Header_TextContainer}>
                <Text style={s.Header_CityText} numberOfLines={1} ellipsizeMode={"tail"}>{`Город ${city}`}</Text>
                <Text style={s.Header_Text} numberOfLines={1} ellipsizeMode={"tail"}>Прогноз прибытия транспорта</Text>
            </View>
            {isLoading ? <ActivityIndicator size={"small"} color={s.ActivityIndicator.color}/> : <PinBlock active={location ? true: false} onPress={onPinPress}/>}
        </View>
    )
}

export default MainPageHeader;
